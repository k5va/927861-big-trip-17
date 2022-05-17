import { PointView, EditPointView } from '../../view';
import { render, replace, remove } from '../../framework/render';

const Mode = {
  VIEW: 'VIEW',
  EDIT: 'EDIT',
};

export default class PointPresenter {
  #point = null;
  #appStore = null;
  #pointView = null;
  #editPointView = null;
  #pointListView = null;
  #changePointHandler = null;
  #mode = Mode.VIEW;
  #changeModeHandler = null;

  /**
   * Creates new instance of presenter
   * @param {PointListView} pointListView - point list view
   * @param {Store} appStore - app's store
   * @param {Function} changePointHandler - change point handler
   * @param {Function} changeModeHandler - change mode handler
   */
  constructor(pointListView, appStore, changePointHandler, changeModeHandler) {
    this.#pointListView = pointListView;
    this.#appStore = appStore;
    this.#changePointHandler = changePointHandler;
    this.#changeModeHandler = changeModeHandler;
  }

  /**
   * Initializes presenter and renders point
   * @param {Point} point - point data
   */
  init(point) {
    this.#point = point;

    const prevPointView = this.#pointView;
    const prevEditPointView = this.#editPointView;

    this.#pointView = new PointView(this.#point, this.#appStore.getOffers(point.type, point.offers));
    this.#editPointView = new EditPointView(
      this.#point, this.#appStore.getOffers(point.type), this.#appStore.destinations
    );

    this.#pointView.setEditHandler(this.#editHandler);
    this.#pointView.setFavoriteHandler(this.#favoritesHandler);
    this.#editPointView.setSaveHandler(this.#saveHandler);
    this.#editPointView.setCloseHandler(this.#closeHandler);

    if (!prevPointView || !prevEditPointView) {
      render(this.#pointView, this.#pointListView.element);
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
  resetView() {
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
    this.#changeModeHandler();
    this.#mode = Mode.EDIT;
  }

  /**
   * Replaces edit point view to view
   */
  #replaceEditToView() {
    replace(this.#pointView, this.#editPointView);
    this.#editPointView.deactivate();
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
    this.#changePointHandler({...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
