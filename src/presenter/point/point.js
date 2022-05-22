import { PointView, EditPointView } from '../../view';
import { render, replace, remove } from '../../framework/render';
import Store from '../../store/store';
import { filterOffers } from '../../utils';
import { AbstractPresenter } from '../../presenter';
import { AppMode } from '../../const';

const Mode = {
  VIEW: 'VIEW',
  EDIT: 'EDIT',
};

export default class PointPresenter extends AbstractPresenter {
  #point = null;
  #pointView = null;
  #editPointView = null;
  #container = null;
  #mode = Mode.VIEW;

  /**
   * Creates new instance of presenter
   * @param {HTMLElement} container
   */
  constructor(container) {
    super();

    this.#container = container;
    this._appStore.addObserver(this.#changeStoreHandler);
  }

  /**
   * Initializes presenter and renders point
   * @param {Point} point - point data
   */
  init(point) {
    this.#point = point;

    const {offers, destinations} = this._appStore.state;
    const prevPointView = this.#pointView;
    const prevEditPointView = this.#editPointView;

    this.#pointView = new PointView(this.#point, filterOffers(offers, point.type, point.offers));
    this.#editPointView = new EditPointView(this.#point, offers, destinations);

    this.#pointView.setEditHandler(this.#editHandler);
    this.#pointView.setFavoriteHandler(this.#favoritesHandler);
    this.#editPointView.setSaveHandler(this.#saveHandler);
    this.#editPointView.setCloseHandler(this.#closeHandler);

    if (!prevPointView || !prevEditPointView) {
      render(this.#pointView, this.#container);
      return;
    }

    if (this.#mode === Mode.VIEW) {
      replace(this.#pointView, prevPointView);
    } else {
      replace(this.#editPointView, prevEditPointView);
    }

    remove(prevPointView);
    remove(prevEditPointView);
  }

  /**
   * removes presenter's views
   */
  destroy() {
    remove(this.#pointView);
    remove(this.#editPointView);
  }

  /**
   * Reset to point view mode
   */
  #resetView() {
    if (this.#mode !== Mode.VIEW) {
      this.#replaceEditToView();
    }
  }

  /**
   * Replaces point view to edit view
   */
  #replaceViewToEdit() {
    replace(this.#editPointView, this.#pointView);
    this.#editPointView.activate();
    this._appStore.dispatch(Store.MODE_CHANGE, AppMode.EDIT_POINT);
    this.#mode = Mode.EDIT;
  }

  /**
   * Replaces edit point view to view
   */
  #replaceEditToView() {
    const {offers, destinations} = this._appStore.state;
    this.#editPointView.reset(this.#point, offers, destinations);
    this.#editPointView.deactivate();
    replace(this.#pointView, this.#editPointView);
    this._appStore.dispatch(Store.MODE_CHANGE, AppMode.READY);
    this.#mode = Mode.VIEW;
  }

  /**
   * Close handler
   */
  #closeHandler = () => {
    this.#replaceEditToView();
  };

  /**
   * Save handler
   */
  #saveHandler = () => {
    this.#replaceEditToView();
  };

  /**
   * Edit handler
   */
  #editHandler = () => {
    this.#replaceViewToEdit();
  };

  /**
   * Add/remove to favorites handler
   */
  #favoritesHandler = () => {
    const updatedPoint = {...this.#point, isFavorite: !this.#point.isFavorite};
    this._appStore.dispatch(Store.POINT_UPDATE, updatedPoint);
  };

  /**
   * Change store handler
   * @param {String} event - event
   */
  #changeStoreHandler = (event, payload) => {
    if (event === Store.MODE_CHANGE && payload === AppMode.EDIT_POINT) {
      this.#resetView();
    }
  };
}
