import { PointView, EditPointView } from '../../view';
import { render, replace, remove } from '../../framework/render';

export default class PointPresenter {
  #point = null;
  #offersModel = null;
  #destinations = null;
  #pointView = null;
  #editPointView = null;
  #pointListView = null;
  #changePointHandler = null;

  /**
   * Creates new instance of presenter
   * @param {PointListView} pointListView - point list view
   * @param {Offers} offersModel - offers data
   * @param {Array<Destinations>} destinations - available destinations
   * @param {Function} changePointHandler - change point handler
   */
  constructor(pointListView, offersModel, destinations, changePointHandler) {
    this.#pointListView = pointListView;
    this.#offersModel = offersModel;
    this.#destinations = destinations;
    this.#changePointHandler = changePointHandler;
  }

  /**
   * Initializes presenter and renders point
   * @param {Point} point - point data
   */
  init(point) {
    this.#point = point;

    const prevPointView = this.#pointView;
    const prevEditPointView = this.#editPointView;

    this.#pointView = new PointView(this.#point, this.#offersModel.getOffers(point.type, point.offers));
    this.#editPointView = new EditPointView(
      this.#point, this.#offersModel.getOffers(point.type), this.#destinations
    );

    this.#pointView.setEditHandler(this.#editHandler);
    this.#pointView.setFavoriteHandler(this.#favoritesHandler);
    this.#editPointView.setSaveHandler(this.#saveHandler);
    this.#editPointView.setCloseHandler(this.#closeHandler);

    if (!prevPointView || !prevEditPointView) {
      render(this.#pointView, this.#pointListView.element);
      return;
    }

    // TODO: is it possible? Add method to AbstractView?
    if (this.#pointListView.element.contains(prevPointView.element)) {
      replace(this.#pointView, prevPointView);
    }

    if (this.#pointListView.element.contains(prevEditPointView.element)) {
      replace(this.#editPointView, prevEditPointView);
    }

    remove(prevPointView);
    remove(prevEditPointView);
  }

  /**
   * removes presenter's view's
   */
  destroy() {
    remove(this.#pointView);
    remove(this.#editPointView);
  }

  /**
   * Replaces point view to edit view
   * @param {PointView} pointView - point view
   * @param {PointEditView} editPointView - point edit view
   */
  #replaceViewToEdit(pointView, editPointView) {
    replace(editPointView, pointView);
    editPointView.activate();
  }

  /**
   * Replaces edit point view to view
   * @param {PointView} pointView - point view
   * @param {PointEditView} editPointView - point edit view
   */
  #replaceEditToView(pointView, editPointView) {
    replace(pointView, editPointView);
    editPointView.deactivate();
  }

  /**
   * Close handler
   */
  #closeHandler = () => {
    this.#replaceEditToView(this.#pointView, this.#editPointView);
  };

  /**
   * Save handler
   */
  #saveHandler = () => {
    this.#replaceEditToView(this.#pointView, this.#editPointView);
  };

  /**
   * Edit handler
   */
  #editHandler = () => {
    this.#replaceViewToEdit(this.#pointView, this.#editPointView);
  };

  /**
   * Add/remove to favorites handler
   */
  #favoritesHandler = () => {
    this.#point.isFavorite = !this.#point.isFavorite;
    this.#changePointHandler(this.#point);
  };
}
