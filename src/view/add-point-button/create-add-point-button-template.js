/**
 * Creates add new button template
 * @returns {String} template
 */
const createAddPointButtonTemplate = ({isEnabled}) =>
  `<button
    class="trip-main__event-add-btn btn btn--big btn--yellow"
    type="button" ${isEnabled ? '' : 'disabled'}>New event
  </button>`;

export {createAddPointButtonTemplate};
