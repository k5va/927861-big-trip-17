import { EditPointView } from '../../view';
import { render, remove, RenderPosition } from '../../framework/render';
import { AbstractPresenter } from '..';
import { AppMode } from '../../const';
import { Point } from '../../model';
import { Actions } from '../../store';

export default class AddPointPresenter extends AbstractPresenter {
  #editPointView = null;
  #container = null;

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
   */
  init() {
    const {offers, destinations} = this._appStore.state;

    this.#editPointView = new EditPointView(Point.createBlank(), offers, destinations, false);

    this.#editPointView.setSaveHandler(this.#saveHandler);
    this.#editPointView.setCloseHandler(this.#closeHandler);
    this.#editPointView.setDeleteHandler(this.#closeHandler);

    render(this.#editPointView, this.#container, RenderPosition.AFTERBEGIN);
    this.#editPointView.activate();
    this._appStore.dispatch(Actions.MODE_CHANGE, AppMode.ADD_POINT);
  }

  /**
   * Close handler
   */
  #closeHandler = () => {
    this.#editPointView.deactivate();
    remove(this.#editPointView);
    this._appStore.dispatch(Actions.MODE_CHANGE, AppMode.READY);
  };

  /**
   * Save handler
   * @param {Point} point - updated point
   */
  #saveHandler = async (point) => {
    this.#editPointView.block();
    try {
      const createdPoint = await this._api.addPoint(point);
      this.#editPointView.unblock();
      this._appStore.dispatch(Actions.POINT_ADD, createdPoint);
      remove(this.#editPointView);
      this._appStore.dispatch(Actions.MODE_CHANGE, AppMode.READY);
    } catch(err) {
      this.#editPointView.shake(() => this.#editPointView.unblock());
    }
  };

  /**
   * Change store handler
   * @param {String} event - event
   */
  #changeStoreHandler = (event, payload) => {
    if (event === Actions.MODE_CHANGE && payload === AppMode.EDIT_POINT) {
      this.#editPointView.deactivate();
      remove(this.#editPointView);
    }
  };
}
