import { PointView, EditPointView } from '../../view';
import { render, replace, remove } from '../../framework/render';
import { AbstractPresenter } from '..';
import { AppMode } from '../../const';
import { Actions } from '../../store';

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

    this.#pointView = new PointView(this.#point, offers);
    this.#editPointView = new EditPointView(this.#point, offers, destinations);

    this.#pointView.setEditHandler(this.#editHandler);
    this.#pointView.setFavoriteHandler(this.#favoritesHandler);
    this.#editPointView.setSaveHandler(this.#saveHandler);
    this.#editPointView.setDeleteHandler(this.#deleteHandler);
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
      const {offers, destinations} = this._appStore.state;
      this.#editPointView.reset(this.#point, offers, destinations);
      this.#replaceEditToView();
    }
  }

  /**
   * Replaces point view to edit view
   */
  #replaceViewToEdit() {
    replace(this.#editPointView, this.#pointView);
    this.#editPointView.activate();
    this._appStore.dispatch(Actions.MODE_CHANGE, AppMode.EDIT_POINT);
    this.#mode = Mode.EDIT;
  }

  /**
   * Replaces edit point view to view
   */
  #replaceEditToView() {
    this.#editPointView.deactivate();
    replace(this.#pointView, this.#editPointView);
    this.#mode = Mode.VIEW;
  }

  /**
   * Close handler
   */
  #closeHandler = () => {
    const {offers, destinations} = this._appStore.state;
    this.#editPointView.reset(this.#point, offers, destinations);
    this.#replaceEditToView();
    this._appStore.dispatch(Actions.MODE_CHANGE, AppMode.READY);
  };

  /**
   * Save handler
   * @param {Point} point - updated point
   */
  #saveHandler = async (point) => {
    this.#editPointView.block();
    try {
      const updatedPoint = await this._api.updatePoint(point);
      this.#editPointView.unblock();
      this.#replaceEditToView();
      this._appStore.dispatch(Actions.MODE_CHANGE, AppMode.READY);
      this._appStore.dispatch(Actions.POINT_UPDATE, updatedPoint);
    } catch (err) {
      this.#editPointView.shake(() => this.#editPointView.unblock());
    }
  };

  /**
   * Delete handler
   * @param {Point} point - point
   */
  #deleteHandler = async (point) => {
    this.#editPointView.block();
    try {
      await this._api.deletePoint(point);
      this.#editPointView.unblock();
      this._appStore.dispatch(Actions.POINT_DELETE, point.id);
    } catch(err) {
      this.#editPointView.shake(() => this.#editPointView.unblock());
    }
  };

  /**
   * Edit handler
   */
  #editHandler = () => {
    this.#replaceViewToEdit();
  };

  /**
   * Add/remove to favorites handler
   * @param {Point} point - updated point
   */
  #favoritesHandler = async (point) => {
    const updatedPoint = await this._api.updatePoint(point);
    this._appStore.dispatch(Actions.POINT_UPDATE, updatedPoint);
  };

  /**
   * Change store handler
   * @param {String} event - event
   */
  #changeStoreHandler = (event, payload) => {
    if (event === Actions.MODE_CHANGE &&
      (payload === AppMode.EDIT_POINT || payload === AppMode.ADD_POINT)) {
      this.#resetView();
    }
  };
}
