
import { useState } from "react";

function CampusMap({
  route = null,
  selectedPlaceId = null,
  onPlaceSelect,
  showLegend = true,
}) {
  const [zoom, setZoom] = useState(1);

  function changeZoom(amount) {
    setZoom((current) => Math.min(1.2, Math.max(0.9, current + amount)));
  }

  function placeClass(baseClass, placeId) {
    let routeClass = "";
    const locationClass = selectedPlaceId === placeId ? " location-selected" : "";

    if (route?.startId === placeId) {
      routeClass = " route-start";
    } else if (route?.destinationId === placeId) {
      routeClass = " route-destination";
    }

    return `map-place ${baseClass}${locationClass}${routeClass}`;
  }

  return (
    <section className="campus-map" aria-label="Illustrative campus map">
      <div className="map-area">
        <div className="map-art" style={{ transform: `scale(${zoom})` }}>
          <div className="map-lawn lawn-left" />
          <div className="map-lawn lawn-center" />
          <div className="map-lawn lawn-right" />
          <div className="map-lawn lawn-bottom" />

          <div className="map-road road-vertical road-left" />
          <div className="map-road road-vertical road-middle" />
          <div className="map-road road-vertical road-right" />
          <div className="map-road road-horizontal road-top" />
          <div className="map-road road-horizontal road-bottom" />

          {route && (
            <svg
              className="map-route"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              role="img"
              aria-label={`Illustrative route from ${route.startName} to ${route.destinationName}`}
            >
              <polyline
                points={route.path.map(({ x, y }) => `${x},${y}`).join(" ")}
              />
            </svg>
          )}

          <button
            type="button"
            className={placeClass("place-library", "library")}
            aria-label="Select Library as destination"
            aria-pressed={selectedPlaceId === "library"}
            onClick={() => onPlaceSelect?.("library")}
          >
            <span className="map-building" />
            <strong>Library</strong>
          </button>
          <button
            type="button"
            className={placeClass("place-halls", "lecture-halls")}
            aria-label="Select Science Center as destination"
            aria-pressed={selectedPlaceId === "lecture-halls"}
            onClick={() => onPlaceSelect?.("lecture-halls")}
          >
            <span className="map-building selected-building" />
            <strong>Science Center</strong>
          </button>
          <button
            type="button"
            className={placeClass("place-labs", "computer-labs")}
            aria-label="Select Computer Labs as destination"
            aria-pressed={selectedPlaceId === "computer-labs"}
            onClick={() => onPlaceSelect?.("computer-labs")}
          >
            <span className="map-building" />
            <strong>Computer Labs</strong>
          </button>
          <button
            type="button"
            className={placeClass("place-admin", "administration")}
            aria-label="Select Administration Block as destination"
            aria-pressed={selectedPlaceId === "administration"}
            onClick={() => onPlaceSelect?.("administration")}
          >
            <span className="map-building" />
            <strong>Administration Block</strong>
          </button>
          <button
            type="button"
            className={placeClass("place-centre", "student-centre")}
            aria-label="Select Student Centre as destination"
            aria-pressed={selectedPlaceId === "student-centre"}
            onClick={() => onPlaceSelect?.("student-centre")}
          >
            <span className="map-building" />
            <strong>Student Centre</strong>
          </button>
          <button
            type="button"
            className={placeClass("place-cafe", "cafeteria")}
            aria-label="Select Cafellata as destination"
            aria-pressed={selectedPlaceId === "cafeteria"}
            onClick={() => onPlaceSelect?.("cafeteria")}
          >
            <span className="map-building" />
            <strong>Cafellata</strong>
          </button>
          <button
            type="button"
            className={placeClass("place-parking", "parking-area")}
            aria-label="Select Parking Area as destination"
            aria-pressed={selectedPlaceId === "parking-area"}
            onClick={() => onPlaceSelect?.("parking-area")}
          >
            <span className="map-building" />
            <strong>Parking Area</strong>
          </button>
          <button
            type="button"
            className={placeClass("place-sports", "sports-facilities")}
            aria-label="Select Sports Facilities as destination"
            aria-pressed={selectedPlaceId === "sports-facilities"}
            onClick={() => onPlaceSelect?.("sports-facilities")}
          >
            <span className="map-building" />
            <strong>Sports Facilities</strong>
          </button>
          <span className="central-green">CENTRAL GREEN</span>
          <button
            type="button"
            className={`main-entrance${selectedPlaceId === "main-entrance" ? " location-selected" : ""}${route?.startId === "main-entrance" ? " route-start" : ""}${route?.destinationId === "main-entrance" ? " route-destination" : ""}`}
            aria-label="Select USIU Gate A as destination"
            aria-pressed={selectedPlaceId === "main-entrance"}
            onClick={() => onPlaceSelect?.("main-entrance")}
          >
            USIU Gate A
          </button>
        </div>

        <label className="map-search">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="6.8" />
            <path d="m16 16 5 5" />
          </svg>
          <input aria-label="Search buildings or facilities" placeholder="Search buildings or facilities" />
        </label>

        <div className="map-compass" aria-label="North">
          <strong>↑</strong>
          <span>N</span>
        </div>

        <div className="map-controls" role="group" aria-label="Map controls">
          <button type="button" aria-label="Zoom in" onClick={() => changeZoom(0.1)}>+</button>
          <button type="button" aria-label="Zoom out" onClick={() => changeZoom(-0.1)}>−</button>
          <button type="button" aria-label="Centre map" onClick={() => setZoom(1)}>⌾</button>
        </div>
      </div>

      {showLegend && (
        <div className="map-legend">
          <span><i className="legend-buildings" /> Campus buildings</span>
          <span><i className="legend-green" /> Green spaces</span>
          <span>Click a building to choose a destination</span>
        </div>
      )}
    </section>
  );
}

export default CampusMap;
