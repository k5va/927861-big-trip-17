import { formatDate } from '../../utils';
import { PointType } from '../../const';

/**
 * Creates point types template string
 * @param {String} currentType - current type
 * @returns {String} template string
 */
const createPointTypeList = (currentType) => Object.values(PointType).map((type) => {
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

/**
 * Creates offers list template string
 * @param {Array<String>} selectedIds - array of selected offers' ids
 * @param {Array<Offer>} offers - array of available offers
 * @returns {String} template string
 */
const createOffersTemplate = (selectedIds, offers) => offers.map(({id, title, price}) => `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}"
        type="checkbox" name="event-offer-${id}"
        ${selectedIds.some((selectedId) => selectedId === id) ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${id}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>
  `).join('');

/**
 * Creates edit event template
 * @param {Point} point - point data
 * @param {Array<Offer>} offers - offers
 * @returns {String} template
 */
const template = (point, offers) => {
  const {type, dateFrom, dateTo, destination, bestPrice} = point;

  const eventStartTime = formatDate(dateFrom, 'DD/MM/YY HH:mm');
  const eventEndTime = formatDate(dateTo, 'DD/MM/YY HH:mm');

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png"
              alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${createPointTypeList(type)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">${type}</label>
          <input class="event__input  event__input--destination" id="event-destination-1"
            type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1"
            type="text" name="event-start-time" value="${eventStartTime}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1"
            type="text" name="event-end-time" value="${eventEndTime}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1"
            type="text" name="event-price" value="${bestPrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">${createOffersTemplate(point.offers, offers)}</div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination.description}</p>
        </section>
      </section>
    </form>
  </li>`;

};

export {template};
