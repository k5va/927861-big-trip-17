import { PointType } from '../../const';
import { filterOffers } from '../../utils';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import { createEditPointTemplate } from './create-edit-point-template';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import EditPointMode from './edit-point-mode';

export default class EditPointView extends AbstractStatefulView {
  #dateFromPicker = null;
  #dateToPicker = null;
  #point = null;

  /**
   * Creates an instance of view
   * @param {Point} point - point data
   * @param {Array<Destination>} destinations - available destinations
   * @param {Object} offers - available offers
   * @param {Boolean} isEditPoint - true if edit point, false if add point
   */
  constructor(point, offers, destinations, isEditPoint = true) {
    super();

    this.#point = point;
    this._state = this.#mapPointToState(point, offers, destinations, isEditPoint);
    this.#setInnerHandlers();
    this.#setDatePickers();
  }

  /**
   * Returns view's html template
   * @returns {String} - view's template
   */
  get template() {
    return createEditPointTemplate(this._state);
  }

  /**
   * Sets save point handler
   * @param {Function} handler - handler
   */
  setSaveHandler(handler) {
    this._callback.save = handler;
    this.element.querySelector('.event--edit').addEventListener('submit', this.#saveHandler);
  }

  /**
   * Handler for edit point
   * @param {Event} evt - event object
   */
  #saveHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({mode: EditPointMode.SAVING});
    this._callback.save?.(this.#mapStateToPoint());
  };

  /**
   * Sets close handler
   * @param {Function} handler - handler
   */
  setCloseHandler(handler) {
    this._callback.close = handler;
    if (this._state.isEditPoint) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeHandler);
    }
  }

  /**
   * Handler for close
   * @param {Event} evt - event object
   */
  #closeHandler = (evt) => {
    evt.preventDefault();
    this._callback.close?.();
  };

  /**
   * Sets delete point handler
   * @param {Function} handler - handler
   */
  setDeleteHandler(handler) {
    this._callback.delete = handler;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteHandler);
  }

  /**
   * Handler for delete
   * @param {Event} evt - event object
   */
  #deleteHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({mode: EditPointMode.DELETING});
    this._callback.delete?.(this.#mapStateToPoint());
  };

  /**
   * Resets view
   * @param {Point} point - point data
   * @param {Array<Destination>} destinations - available destinations
   * @param {Object} offers - available offers
   */
  reset(point, offers, destinations) {
    this.updateElement(this.#mapPointToState(point, offers, destinations));
  }

  /**
   * Activates view (when is visible to user)
   */
  activate() {
    document.addEventListener('keydown', this.#keydownHandler);
  }

  /**
   * Deactivates view (when is not visible to user)
   */
  deactivate() {
    document.removeEventListener('keydown', this.#keydownHandler);
  }

  /**
   * Handler for document key down event
   * @param {KeyboardEvent} evt - event object
   */
  #keydownHandler = (evt) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      this._callback.close?.();
    }
  };

  /**
   * Restores all handlers
   */
  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDatePickers();
    this.setSaveHandler(this._callback.save);
    this.setCloseHandler(this._callback.close);
    this.setDeleteHandler(this._callback.delete);
  };

  /**
   * Maps point data to view's state
   * @param {Point} point
   * @returns {Object} state
   */
  #mapPointToState(point, offers, destinations, isEditPoint) {
    return {
      ...point,
      pointTypes: Object.values(PointType),
      currentDestination: destinations.find(({name}) => name === point.destination),
      allDestinations: [...destinations],
      filteredOffers: filterOffers(offers, point.type),
      allOffers: offers,
      isEditPoint,
      mode: EditPointMode.NORMAL,
    };
  }

  /**
   * Maps view's state data to point
   * @returns {Point} point
   */
  #mapStateToPoint() {
    this.#point.bestPrice = this._state.bestPrice;
    this.#point.type = this._state.type;
    this.#point.dateFrom = this._state.dateFrom;
    this.#point.dateTo = this._state.dateTo;
    this.#point.offers = this._state.offers;
    this.#point.destination = this._state.destination;
    this.#point.isFavorite = this._state.isFavorite;

    return this.#point;
  }

  /**
   * Sets all inner handlers
   */
  #setInnerHandlers() {
    this.element.querySelector('.event__type-list')
      .addEventListener('change', this.#changePointTypeHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#changeDestinationHandler);
    this.element.querySelector('.event__available-offers')
      .addEventListener('change', this.#changeOfferHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#inputPriceHandler);
  }

  /**
   * Handles change point type event
   * @param {Event} evt - event object
   */
  #changePointTypeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.classList.contains('event__type-input')) {
      this.updateElement({
        type: evt.target.value,
        offers: [],
        filteredOffers: filterOffers(this._state.allOffers, evt.target.value),
      });
    }
  };

  /**
   * Handles change destination event
   * @param {Event} evt - event object
   */
  #changeDestinationHandler = (evt) => {
    evt.preventDefault();
    const currentDestination = this._state.allDestinations.find(({name}) => name === evt.target.value);
    if (currentDestination) {
      evt.target.setCustomValidity('');
      this.updateElement({destination: evt.target.value, currentDestination});
    } else {
      evt.target.setCustomValidity('Please enter valid destination');
      evt.target.reportValidity();
    }
  };

  /**
   * Change price handler
   * @param {Event} evt - event object
   */
  #inputPriceHandler = (evt) => {
    evt.preventDefault();
    this._setState({bestPrice: Number(evt.target.value)});
  };

  /**
   * Handles change offer event
   * @param {Event} evt - event object
   */
  #changeOfferHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.classList.contains('event__offer-checkbox')) {
      const {offers} = this._state;
      const selectedOffers = evt.target.checked ?
        [...offers, evt.target.value] :
        offers.filter((value) => value !== evt.target.value);

      this._setState({offers: selectedOffers});
    }
  };

  /**
   * Initializes date picking
   */
  #setDatePickers() {
    const params = {enableTime: true, dateFormat: 'd/m/y H:i', 'time_24hr': true};

    this.#dateFromPicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {...params, defaultDate: this._state.dateFrom, maxDate: this._state.dateTo,
        onChange: this.#changeDateFromHandler},
    );
    this.#dateToPicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {...params, defaultDate: this._state.dateTo, minDate: this._state.dateFrom,
        onChange: this.#changeDateToHandler},
    );
  }

  /**
   * Change date from handler
   */
  #changeDateFromHandler = ([userDate]) => {
    this._setState({dateFrom: userDate});
    this.#dateToPicker.set('minDate', userDate);
  };

  /**
   * Change date To handler
   */
  #changeDateToHandler = ([userDate]) => {
    this._setState({dateTo: userDate});
    this.#dateFromPicker.set('maxDate', userDate);
  };

  /**
   * removes element
   */
  removeElement = () => {
    super.removeElement();

    this.#dateFromPicker?.destroy();
    this.#dateFromPicker = null;

    this.#dateToPicker?.destroy();
    this.#dateToPicker = null;
  };

  unblock() {
    this.updateElement({mode: EditPointMode.NORMAL});
    super.unblock();
  }
}
