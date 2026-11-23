function FacilityCard({ facility, onViewLocation }) {
  return (
    <article className="facility-card">
      <h3>{facility.name}</h3>
      <p>{facility.description}</p>
      <button
        type="button"
        className="facility-link"
        aria-label={`View ${facility.name} on the campus map`}
        onClick={() => onViewLocation(facility)}
      >
        View Location <span aria-hidden="true">↗</span>
      </button>
    </article>
  );
}

export default FacilityCard;