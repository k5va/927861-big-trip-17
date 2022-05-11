/**
   * Creates new instance of view
   * @param {String} activeSorting - active sortings
   * @param {Array<String>} sortings - array of available sortings
   * @param {Array<String>} disabled - array of disabled sortings
   * @returns {String} - template
   */
const createSortTemplate = (activeSorting, sortings, disabled) =>
  `<form class="trip-events__trip-sort trip-sort" action="#" method="get">
    ${sortings.map((sorting) => `
      <div class="trip-sort__item  trip-sort__item--${sorting.toLowerCase()}">
        <input id="sort-${sorting}" class="trip-sort__input  visually-hidden"
          type="radio" name="trip-sort" value="${sorting}"
          ${sorting === activeSorting ? 'checked' : ''}
          ${disabled.includes(sorting) ? 'disabled' : ''}
        >
        <label class="trip-sort__btn" for="sort-${sorting}">${sorting}</label>
      </div>
    `).join('')}
  </form>`;

export {createSortTemplate};
