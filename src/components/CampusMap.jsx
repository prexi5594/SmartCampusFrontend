
import { useState } from "react";

function CampusMap() {
  const [zoom, setZoom] = useState(1);

  function changeZoom(amount) {
    setZoom((current) => Math.min(1.2, Math.max(0.9, current + amount)));
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

          <div className="map-place place-library">
            <span className="map-building" />
            <strong>Library</strong>
          </div>
          <div className="map-place place-halls">
            <span className="map-building selected-building" />
            <strong>Lecture Halls</strong>
          </div>
          <div className="map-place place-labs">
            <span className="map-building" />
            <strong>Computer Labs</strong>
          </div>
          <div className="map-place place-admin">
            <span className="map-building" />
            <strong>Administration</strong>
          </div>
          <div className="map-place place-centre">
            <span className="map-building" />
            <strong>Student Centre</strong>
          </div>
          <div className="map-place place-cafe">
            <span className="map-building" />
            <strong>Cafeteria</strong>
          </div>
          <div className="map-place place-parking">
            <span className="map-building" />
            <strong>Parking Area</strong>
          </div>
          <div className="map-place place-sports">
            <span className="map-building" />
            <strong>Sports Facilities</strong>
          </div>
          <span className="central-green">CENTRAL GREEN</span>
          <span className="main-entrance">Main Entrance</span>
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

      <div className="map-legend">
        <span><i className="legend-buildings" /> Campus buildings</span>
        <span><i className="legend-green" /> Green spaces</span>
        <span>Illustrative campus map</span>
      </div>
    </section>
  );
}

export default CampusMap;
