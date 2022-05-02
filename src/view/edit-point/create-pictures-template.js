/**
 * Creates destination pictures template string
 * @param {Array<Object>} pictures - array of destination pictures
 * @returns {String} template string
 */
const createPicturesTemplate = (pictures) => {
  if (!pictures.length) {
    return '';
  }

  return `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${pictures.map(({src, description}) => `
          <img class="event__photo" src="${src}" alt="${description}">
        `).join('')}
      </div>
    </div>`;
};

export {createPicturesTemplate};
