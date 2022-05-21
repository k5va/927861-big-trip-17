import { PointType } from '../../const';
import { filterOffers } from '../../utils';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import { createEditPointTemplate } from './create-edit-point-template';

export default class EditPointView extends AbstractStatefulView {

  /**
   * Creates an instance of view
   * @param {Point} point - point data
   * @param {Array<Destination>} destinations - available destinations
   * @param {Object} offers - available offers
   */
  constructor(point, offers, destinations) {
    super();

    this._state = this.#mapPointToState(point, offers, destinations);
    this.#setInnerHandlers();
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
    this._callback.save?.();
  };

  /**
   * Sets close handler
   * @param {Function} handler - handler
   */
  setCloseHandler(handler) {
    this._callback.close = handler;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeHandler);
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
    this.setSaveHandler(this._callback.save);
    this.setCloseHandler(this._callback.close);
  };

  /**
   * Maps point data to view's state
   * @param {Point} point
   * @returns {Object} state
   */
  #mapPointToState(point, offers, destinations) {
    return {
      ...point,
      pointTypes: Object.values(PointType),
      currentDestination: destinations.find(({name}) => name === point.destination),
      allDestinations: [...destinations],
      filteredOffers: filterOffers(offers, point.type),
      allOffers: offers,
    };
  }

  /**
   * Maps view's state data to point
   * @returns {Point} point
   */
  #mapStateToPoint() {
    const point = {...this._state};

    delete point.allOffers;
    delete point.pointTypes;
    delete point.currentDestination;
    delete point.allDestinations;

    return point;
  }

  /**
   * Sets all inner handlers
   */
  #setInnerHandlers() {
    this.element.querySelector('.event__type-list').addEventListener(
      'change', this.#changePointTypeHandler
    );
    this.element.querySelector('.event__input--destination').addEventListener(
      'change', this.#changeDestinationHandler
    );
    this.element.querySelector('.event__input--price').addEventListener(
      'input', this.#inputPriceHandler
    );

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
      this.updateElement({destination: evt.target.value, currentDestination});
    }
  };

  /**
   * Change price handler
   * @param {Event} evt - event object
   */
  #inputPriceHandler = (evt) => {
    evt.preventDefault();
    this._setState({bestPrice: evt.target.value});
  };
}
