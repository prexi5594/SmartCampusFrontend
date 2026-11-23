
import { useEffect, useRef, useState } from "react";

import CampusMap from "../components/CampusMap";
import RoutePlanner from "../components/RoutePlanner";

function ExploreCampusPage({
  facilities,
  routeFacilities,
  selectedFacilityId,
}) {
  const [route, setRoute] = useState(null);
  const [selectedPlaceId, setSelectedPlaceId] = useState(selectedFacilityId || "");
  const mapRef = useRef(null);

  useEffect(() => {
    if (selectedFacilityId) {
      setSelectedPlaceId(selectedFacilityId);
      mapRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedFacilityId]);

  function selectPlace(placeId) {
    setSelectedPlaceId(placeId);
    setRoute(null);
  }

  function changeDestination(placeId) {
    setSelectedPlaceId(placeId);
    setRoute(null);
  }

  const placesSummary =
    facilities.length === routeFacilities.length
      ? `${routeFacilities.length} places around campus`
      : `${facilities.length} matching places`;

  return (
    <main className="page-container explore-page">
      <div className="page-heading explore-page-heading">
        <span className="eyebrow">CAMPUS GUIDE / EXPLORE</span>
        <h1>Your next stop, made simple.</h1>
        <p>Search a place, choose your route and find your way.</p>
      </div>

      <div className="explore-route-layout">
        <div className="explore-route-sidebar">
          <section className="explore-facilities-panel">
            <header className="explore-facilities-heading">
              <h2>Explore facilities</h2>
              <p>{placesSummary}</p>
            </header>

            <div className="explore-facility-list">
              {facilities.map((facility) => (
                <button
                  key={facility.id}
                  type="button"
                  className={`explore-facility-button${selectedPlaceId === facility.routeId ? " selected" : ""}`}
                  aria-pressed={selectedPlaceId === facility.routeId}
                  onClick={() => selectPlace(facility.routeId)}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  <span>{facility.name}</span>
                  <span className="facility-chevron" aria-hidden="true">›</span>
                </button>
              ))}
              {facilities.length === 0 && (
                <p className="empty-message">No facilities match your search.</p>
              )}
            </div>
          </section>

          <RoutePlanner
            facilities={routeFacilities}
            destinationId={selectedPlaceId}
            onDestinationChange={changeDestination}
            onRouteChange={setRoute}
            onStartDirections={() =>
              mapRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
            }
          />
        </div>

        <section className="campus-overview-panel" ref={mapRef}>
          <header className="campus-overview-heading">
            <strong>Campus overview</strong>
            <span className="walking-route-legend">
              <i /> Walking route
            </span>
          </header>

          <div id="campus-map-view">
            <CampusMap
              route={route}
              selectedPlaceId={selectedPlaceId}
              onPlaceSelect={selectPlace}
              showLegend={false}
            />
          </div>
          <p className="campus-overview-note">
            Illustrative campus map · Routes are shown for design purposes.
          </p>
        </section>
      </div>
    </main>
  );
}

export default ExploreCampusPage;
