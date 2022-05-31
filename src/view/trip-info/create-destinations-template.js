const MAX_DESTINATIONS_NUM = 3;

/**
 * Creates destinations template
 * @param {Array<String>} destinations - array of trip's destinations
 * @returns {String} template
 */
const createDestinationsTemplate = (destinations) => {
  if (destinations.length === 0) {
    return '<h1 class="trip-info__title">&hellip;</h1>';
  }

  if (destinations.length <= MAX_DESTINATIONS_NUM) {
    return `<h1 class="trip-info__title">${destinations.join(' &mdash; ')}</h1>`;
  }

  return `
    <h1 class="trip-info__title">
      ${[destinations.at(0), '&hellip;', destinations.at(-1)].join(' &mdash; ')}
    </h1>`;
};

export {createDestinationsTemplate};
