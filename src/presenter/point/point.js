import { PointView, EditPointView } from '../../view';
import { render, replace, remove } from '../../framework/render';

export default class PointPresenter {
  #point = null;
  #offersModel = null;
  #destinations = null;
  #pointView = null;
  #editPointView = null;
  #pointListView = null;

  /**
   * Creates new instance of presenter
   * @param {PointListView} pointListView - point list view
   * @param {Offers} offersModel - offers data
   * @param {Array<Destinations>} destinations - available destinations
   */
  constructor(pointListView, offersModel, destinations) {
    this.#pointListView = pointListView;
    this.#offersModel = offersModel;
    this.#destinations = destinations;
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

    this.#pointView.setEditHandler(() => {
      this.#replaceViewToEdit(this.#pointView, this.#editPointView);
    });

    this.#editPointView.setSaveHandler(() => {
      this.#replaceEditToView(this.#pointView, this.#editPointView);
    });

    this.#editPointView.setCloseHandler(() => {
      this.#replaceEditToView(this.#pointView, this.#editPointView);
    });

    if (!prevPointView || !prevEditPointView) {
      render(this.#pointView, this.#pointListView.element);
      return;
    }

    // TODO: is it possible? Add method to AbstractView?
    if (this.#pointListView.element.contains(prevPointView.element)) {
      replace(this.#pointListView, prevPointView);
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
}
