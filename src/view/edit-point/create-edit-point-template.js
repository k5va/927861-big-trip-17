import { formatDate } from '../../utils';
import { createPointTypesTemplate } from './create-point-types-template';
import { createOffersTemplate } from './create-offers-template';
import { createPicturesTemplate } from './create-pictures-template';
import { createDestinationsTemplate } from './create-destinations-template';

/**
 * Creates edit event template
 * @param {Object} state - view's state
 * @returns {String} template
 */
const createEditPointTemplate = (state) => {
  const {type, dateFrom, dateTo, offers, pointTypes,
    bestPrice, currentDestination, allDestinations, allOffers} = state;
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
              ${createPointTypesTemplate(type, pointTypes)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">${type}</label>
          <input class="event__input  event__input--destination" id="event-destination-1"
            type="text" name="event-destination" value="${currentDestination.name}" list="destination-list-1">
          <datalist id="destination-list-1">
          ${createDestinationsTemplate(allDestinations)}
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

          <div class="event__available-offers">${createOffersTemplate(offers, allOffers)}</div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${currentDestination.description}</p>
          ${createPicturesTemplate(currentDestination.pictures)}
        </section>
      </section>
    </form>
  </li>`;
};

export {createEditPointTemplate};
