import FacilityCard from "./FacilityCard";

function FacilityGrid({ facilities, onViewLocation }) {
  if (!facilities.length) {
    return <p className="empty-message">No facilities found.</p>;
  }

  return (
    <div className="facility-grid">
      {facilities.map((facility) => (
        <FacilityCard
          key={facility.id}
          facility={facility}
          onViewLocation={onViewLocation}
        />
      ))}
    </div>
  );
}

export default FacilityGrid;