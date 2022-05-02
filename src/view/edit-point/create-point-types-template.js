import { PointType } from '../../const';

/**
 * Creates point types template string
 * @param {String} currentType - current type
 * @returns {String} template string
 */
const createPointTypesTemplate = (currentType) => Object.values(PointType).map((type) => {
  const formattedType = type.toLowerCase();
  return `
    <div class="event__type-item">
      <input id="event-type-${formattedType}-1" class="event__type-input  visually-hidden"
        type="radio" name="event-type" value="${formattedType}"
        ${formattedType === currentType ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${formattedType}"
        for="event-type-${formattedType}-1">${type}</label>
    </div>`;
}).join('');

export {createPointTypesTemplate};
