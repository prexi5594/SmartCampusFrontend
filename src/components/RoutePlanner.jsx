import { useState } from "react";

function RoutePlanner({ facilities }) {
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const [message, setMessage] = useState("");

  function handleRoute(event) {
    event.preventDefault();

    if (!start || !destination) {
      setMessage("Please select both a starting point and destination.");
      return;
    }

    if (start === destination) {
      setMessage("Your starting point and destination are the same.");
      return;
    }

    setMessage(
      `Your selected journey is from ${start} to ${destination}.`
    );
  }

  return (
    <section className="route-planner">
      <h3>Plan Your Route</h3>
      <p>Select where you are and where you want to go.</p>

      <form onSubmit={handleRoute}>
        <label htmlFor="start">Starting point</label>
        <select
          id="start"
          value={start}
          onChange={(event) => setStart(event.target.value)}
        >
          <option value="">Choose starting point</option>
          {facilities.map((facility) => (
            <option key={facility.id} value={facility.name}>
              {facility.name}
            </option>
          ))}
        </select>

        <label htmlFor="destination">Destination</label>
        <select
          id="destination"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        >
          <option value="">Choose destination</option>
          {facilities.map((facility) => (
            <option key={facility.id} value={facility.name}>
              {facility.name}
            </option>
          ))}
        </select>

        <button type="submit" className="primary-button">
          Find Route
        </button>
      </form>

      {message && <p className="route-message">{message}</p>}
    </section>
  );
}

export default RoutePlanner;