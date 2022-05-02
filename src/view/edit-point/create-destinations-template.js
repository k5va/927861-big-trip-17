/**
 * Creates destinations list template
 * @param {Array<Destination>} destinations - array of available destinations
 * @returns {String} template
 */
const createDestinationsTemplate = (destinations) =>
  destinations.map(({name}) => `<option value="${name}"></option>`).join('');

export {createDestinationsTemplate};
