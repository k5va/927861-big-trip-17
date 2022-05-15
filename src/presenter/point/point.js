import { PointView, EditPointView } from '../../view';
import { render, replace } from '../../framework/render';

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

    const pointView = new PointView(this.#point, this.#offersModel.getOffers(point.type, point.offers));
    const editPointView = new EditPointView(
      this.#point, this.#offersModel.getOffers(point.type), this.#destinations
    );

    pointView.setEditHandler(() => {
      this.#replaceViewToEdit(pointView, editPointView);
    });

    editPointView.setSaveHandler(() => {
      this.#replaceEditToView(pointView, editPointView);
    });

    editPointView.setCloseHandler(() => {
      this.#replaceEditToView(pointView, editPointView);
    });

    render(pointView, this.#pointListView.element);
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
