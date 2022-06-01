import EditPointMode from './edit-point-mode';

/**
 * Creates reset button template string
 * @param {Boolean} isEditPoint
 * @param {String} mode
 * @returns {String} template string
 */
const createResetButtonTemplate = (isEditPoint, mode) => {
  if (!isEditPoint) {
    return '<button class="event__reset-btn" type="reset">Cancel</button>';
  }

  return `
    <button class="event__reset-btn" type="reset">
      ${mode === EditPointMode.DELETING ? 'Deleting...' : 'Delete'}
    </button>`;
};

export {createResetButtonTemplate};
