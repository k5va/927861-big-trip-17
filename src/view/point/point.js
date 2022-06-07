import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import { createPointTemplate } from './create-point-template';
import { filterOffers } from '../../utils';

export default class PointView extends AbstractStatefulView {
  #point = null;

  /**
   * Creates an instance of point view
   * @param {Point} point - point
   * @param {Array<Offer>} offers - offers
   */
  constructor(point, offers) {
    super();

    this.#point = point;
    this._state = this.#mapPointToState(point, offers);
  }

  /**
   * Returns view's html template
   * @returns {String} - view's template
   */
  get template() {
    return createPointTemplate(this._state);
  }

  /**
   * Sets edit point handler
   * @param {Function} handler - handler
   */
  setEditHandler(handler) {
    this._callback.edit = handler;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editHandler);
  }

  /**
   * Handler for edit point
   * @param {Event} evt - event object
   */
  #editHandler = (evt) => {
    evt.preventDefault();
    this._callback.edit?.();
  };

  /**
   * Sets add/remove to favorites handler
   * @param {Function} handler - handler
   */
  setFavoriteHandler(handler) {
    this._callback.favorite = handler;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteHandler);
  }

  /**
   * Handler for add/remove to favorites
   * @param {Event} evt - event object
   */
  #favoriteHandler = (evt) => {
    evt.preventDefault();
    this._setState({isFavorite: !this._state.isFavorite});
    this._callback.favorite?.(this.#mapStateToPoint());
  };

  /**
   * Maps point data to view's state
   * @param {Point} point
   * @returns {Object} state
   */
  #mapPointToState(point, offers) {
    return {
      ...point,
      destination: point.destination,
      filteredOffers: filterOffers(offers, point.type, point.offers),
    };
  }

  /**
   * Maps view's state data to point
   * @returns {Point} point
   */
  #mapStateToPoint() {
    this.#point.isFavorite = this._state.isFavorite;

    return this.#point;
  }

  /**
   * Restores all handlers
   */
  _restoreHandlers = () => {
    this.setEditHandler(this._callback.edit);
    this.setFavoriteHandler(this._callback.favorite);
  };
}
