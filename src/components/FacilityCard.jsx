function FacilityCard({ facility }) {
  return (
    <article className="facility-card">
      <h3>{facility.name}</h3>
      <p>{facility.description}</p>
      <button type="button" className="facility-link">
        View Location <span aria-hidden="true">↗</span>
      </button>
    </article>
  );
}

export default FacilityCard;