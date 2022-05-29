import { EditPointView } from '../../view';
import { render, remove, RenderPosition } from '../../framework/render';
import Store from '../../store/store/store';
import { AbstractPresenter } from '../../presenter';
import { AppMode } from '../../const';
import { Point } from '../../model';

export default class AddPointPresenter extends AbstractPresenter {
  #editPointView = null;
  #container = null;

  /**
   * Creates new instance of presenter
   * @param {HTMLElement} container
   * @param {Store} store
   */
  constructor(container, store) {
    super(store);

    this.#container = container;
    this._appStore.addObserver(this.#changeStoreHandler);
  }

  /**
   * Initializes presenter and renders point
   */
  init() {
    const {offers, destinations} = this._appStore.state;

    this.#editPointView = new EditPointView(Point.createBlank(), offers, destinations);

    this.#editPointView.setSaveHandler(this.#saveHandler);
    this.#editPointView.setCloseHandler(this.#closeHandler);

    render(this.#editPointView, this.#container, RenderPosition.AFTERBEGIN);
    this.#editPointView.activate();
    this._appStore.dispatch(Store.MODE_CHANGE, AppMode.ADD_POINT);
  }

  /**
   * Close handler
   */
  #closeHandler = () => {
    this.#editPointView.deactivate();
    remove(this.#editPointView);
    this._appStore.dispatch(Store.MODE_CHANGE, AppMode.READY);
  };

  /**
   * Save handler
   * @param {Point} point - updated point
   */
  #saveHandler = (point) => {
    //TODO: generate id temporary
    this._appStore.dispatch(Store.POINT_ADD, {...point});
  };

  /**
   * Change store handler
   * @param {String} event - event
   */
  #changeStoreHandler = (event, payload) => {
    if (event === Store.MODE_CHANGE && payload === AppMode.EDIT_POINT) {
      this.#editPointView.deactivate();
      remove(this.#editPointView);
    }
  };
}
