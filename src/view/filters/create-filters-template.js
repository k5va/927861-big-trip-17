/**
 * Creates filters template
 * @param {*} state - view's state
 * @returns {String} template
 */
const createFiltersTemplate = ({activeFilter, filters, disabled}) =>
  `<div class="trip-main__trip-controls  trip-controls">
    <div class="trip-controls__filters">
      <h2 class="visually-hidden">Filter events</h2>
      <form class="trip-filters" action="#" method="get">
        ${filters.map((filter) => `
          <div class="trip-filters__filter">
            <input id="filter-${filter}" class="trip-filters__filter-input visually-hidden"
              type="radio" name="trip-filter" value="${filter}"
              ${filter === activeFilter ? 'checked' : ''}
              ${disabled.includes(filter) ? 'disabled' : ''}
            >
            <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
          </div>
        `).join('')}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    </div>
  </div>
`;

export {createFiltersTemplate};
