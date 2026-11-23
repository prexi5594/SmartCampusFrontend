import FacilityCard from "./FacilityCard";

function FacilityGrid({ facilities }) {
  if (!facilities.length) {
    return <p className="empty-message">No facilities found.</p>;
  }

  return (
    <div className="facility-grid">
      {facilities.map((facility) => (
        <FacilityCard key={facility.id} facility={facility} />
      ))}
    </div>
  );
}

export default FacilityGrid;