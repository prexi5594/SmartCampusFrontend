import { routeEdges, routeNodes } from "../data/campusRoutes";

const nodesById = new Map(routeNodes.map((node) => [node.id, node]));

function getDirection(from, to) {
  const deltaX = to.x - from.x;
  const deltaY = to.y - from.y;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    return deltaX > 0 ? "east" : "west";
  }

  return deltaY > 0 ? "south" : "north";
}

function describeStep(from, to, destinationId) {
  const direction = getDirection(from, to);

  if (to.id === destinationId) {
    return `Arrive at ${to.label}.`;
  }

  if (from.kind === "place" && to.kind === "path") {
    return `Leave ${from.label} and head ${direction} to the walkway.`;
  }

  return `Continue ${direction} along the path toward the ${to.label}.`;
}

export function findCampusRoute(startId, destinationId) {
  const start = nodesById.get(startId);
  const destination = nodesById.get(destinationId);

  if (!start || !destination || startId === destinationId) {
    return null;
  }

  const distances = new Map(routeNodes.map((node) => [node.id, Infinity]));
  const previous = new Map();
  const remaining = new Set(routeNodes.map((node) => node.id));
  distances.set(startId, 0);

  while (remaining.size > 0) {
    let currentId = null;
    let currentDistance = Infinity;

    for (const nodeId of remaining) {
      const distance = distances.get(nodeId);
      if (distance < currentDistance) {
        currentId = nodeId;
        currentDistance = distance;
      }
    }

    if (currentId === null || currentId === destinationId) {
      break;
    }

    remaining.delete(currentId);

    for (const [fromId, toId, distance] of routeEdges) {
      const neighborId =
        fromId === currentId ? toId : toId === currentId ? fromId : null;

      if (neighborId === null || !remaining.has(neighborId)) {
        continue;
      }

      const nextDistance = currentDistance + distance;
      if (nextDistance < distances.get(neighborId)) {
        distances.set(neighborId, nextDistance);
        previous.set(neighborId, currentId);
      }
    }
  }

  if (!Number.isFinite(distances.get(destinationId))) {
    return null;
  }

  const pathIds = [];
  for (let nodeId = destinationId; nodeId; nodeId = previous.get(nodeId)) {
    pathIds.unshift(nodeId);
    if (nodeId === startId) {
      break;
    }
  }

  if (pathIds[0] !== startId) {
    return null;
  }

  const path = pathIds.map((nodeId) => nodesById.get(nodeId));
  const steps = path.slice(1).map((node, index) =>
    describeStep(path[index], node, destinationId)
  );
  const distanceMeters = distances.get(destinationId);

  return {
    startId,
    destinationId,
    startName: start.label,
    destinationName: destination.label,
    path,
    steps,
    distanceMeters,
    durationMinutes: Math.max(1, Math.ceil(distanceMeters / 80)),
  };
}
