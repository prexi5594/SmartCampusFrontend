
function ExploreSidebar({ selectedCategory, onCategoryChange }) {
  const categories = ["All", "Academic", "Services", "Student Life"];

  return (
    <aside className="explore-sidebar">
      <h3>Campus Facilities</h3>

      <p>Browse facilities by category.</p>

      <div className="category-list">
        {categories.map((category) => (
          <button
            key={category}
            className={
              selectedCategory === category
                ? "category-button selected"
                : "category-button"
            }
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </aside>
  );
}

export default ExploreSidebar;
