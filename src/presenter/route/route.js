import { remove, render, replace } from '../../framework/render';
import { EditPointView, NoPointsView, PointListView, PointView, SortView } from '../../view';
import { DISABLED_SORTINGS, NoPointsMessage, Sorting } from '../../const';


export default class RoutePresenter {
  #sortView = null;
  #pointListView = new PointListView();
  #noPointsView = null;
  #container = null;
  #routeModel = null;
  #offersModel = null;
  #destinations = null;

  /**
   * Creates new instance of presenter
   * @param {Route} routeModel - route data
   * @param {Offers} offersModel - offers data
   * @param {Array<Destinations>} destinations - available destinations
   * @param {HTMLElement} container
   */
  constructor(container, routeModel, offersModel, destinations) {
    this.#container = container;
    this.#routeModel = routeModel;
    this.#offersModel = offersModel;
    this.#destinations = destinations;

    this.#routeModel.addObserver(this.#changeModelHandler);
  }

  /**
   * Renders points
   */
  init() {
    if (this.#routeModel.points.length > 0) {
      this.#sortView = new SortView(this.#routeModel.sorting, Object.values(Sorting), DISABLED_SORTINGS);
      this.#sortView.setChangeHandler(this.#changeSortingHandler);
      render(this.#sortView, this.#container);
      render(this.#pointListView, this.#container);
      this.#routeModel.points.forEach((point) => this.#renderPoint(point));
    } else {
      this.#noPointsView = new NoPointsView(NoPointsMessage[this.#routeModel.filter]);
      render(this.#noPointsView, this.#container);
    }
  }

  /**
   * renders given point
   * @param {Point} point - point data
   */
  #renderPoint(point) {
    const pointView = new PointView(point, this.#offersModel.getOffers(point.type, point.offers));
    const editPointView = new EditPointView(
      point,
      this.#offersModel.getOffers(point.type),
      this.#destinations
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

  #changeSortingHandler = (sorting) => {
    this.#routeModel.sorting = sorting;
  };

  /**
   * Replaces edit point view to view
   * @param {PointView} pointView - point view
   * @param {PointEditView} editPointView - point edit view
   */
  #replaceEditToView(pointView, editPointView) {
    replace(pointView, editPointView);
    editPointView.deactivate();
  }

  #changeModelHandler = () => {
    remove(this.#sortView);
    remove(this.#pointListView);
    remove(this.#noPointsView);
    this.init();
  };
}
