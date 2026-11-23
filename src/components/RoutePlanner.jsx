import { useState } from "react";
import { findCampusRoute } from "../utils/findCampusRoute";

function RoutePlanner({
  facilities,
  destinationId,
  onDestinationChange,
  onRouteChange,
  onStartDirections,
}) {
  const [start, setStart] = useState("");
  const [message, setMessage] = useState("");
  const [route, setRoute] = useState(null);
  const destination = destinationId || "";

  function clearRoute() {
    setRoute(null);
    setMessage("");
    onRouteChange(null);
  }

  function handleRoute(event) {
    event.preventDefault();

    if (!start || !destination) {
      setMessage("Please select both a starting point and destination.");
      setRoute(null);
      onRouteChange(null);
      return;
    }

    if (start === destination) {
      setMessage("Your starting point and destination are the same.");
      setRoute(null);
      onRouteChange(null);
      return;
    }

    const result = findCampusRoute(start, destination);
    if (!result) {
      setMessage("No walking route is available for those locations.");
      setRoute(null);
      onRouteChange(null);
      return;
    }

    setMessage("");
    setRoute(result);
    onRouteChange(result);
  }

  return (
    <section className="route-planner">
      <h3>Your walking route</h3>
      <p>Choose your starting location and destination.</p>

      <form onSubmit={handleRoute}>
        <label htmlFor="start">Starting location</label>
        <select
          id="start"
          value={start}
          onChange={(event) => {
            setStart(event.target.value);
            clearRoute();
          }}
        >
          <option value="">Choose starting location</option>
          {facilities.map((facility) => (
            <option key={facility.id} value={facility.routeId}>
              {facility.name}
            </option>
          ))}
          <option value="main-entrance">USIU Gate A</option>
        </select>

        <label htmlFor="destination">Destination</label>
        <select
          id="destination"
          value={destination}
          onChange={(event) => {
            onDestinationChange(event.target.value);
            clearRoute();
          }}
        >
          <option value="">Choose destination</option>
          {facilities.map((facility) => (
            <option key={facility.id} value={facility.routeId}>
              {facility.name}
            </option>
          ))}
          <option value="main-entrance">USIU Gate A</option>
        </select>

        <button type="submit" className="primary-button">
          Find route
        </button>
      </form>

      {message && <p className="route-message">{message}</p>}
      {route && (
        <div className="route-result" aria-live="polite">
          <h4>{route.startName} to {route.destinationName}</h4>
          <p className="route-summary">
            About {route.distanceMeters} m · {route.durationMinutes} min walk
          </p>
          <ol className="route-steps">
            {route.steps.map((step, index) => (
              <li key={`${route.path[index + 1].id}-${index}`}>{step}</li>
            ))}
          </ol>
          <p className="route-disclaimer">
            Illustrative route only. Verify campus paths and distances before use.
          </p>
          <button
            type="button"
            className="primary-button start-directions-button"
            onClick={onStartDirections}
          >
            Start directions
          </button>
        </div>
      )}
    </section>
  );
}

export default RoutePlanner;