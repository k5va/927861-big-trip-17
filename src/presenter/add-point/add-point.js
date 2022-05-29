import { EditPointView } from '../../view';
import { render, remove, RenderPosition } from '../../framework/render';
import { AbstractPresenter } from '../../presenter';
import { AppMode } from '../../const';
import { Point } from '../../model';
import { Actions } from '../../store';
import {nanoid} from 'nanoid';

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

    this.#editPointView = new EditPointView(Point.createBlank(), offers, destinations);

    this.#editPointView.setSaveHandler(this.#saveHandler);
    this.#editPointView.setCloseHandler(this.#closeHandler);

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
  #saveHandler = (point) => {
    //TODO: remove temporary ID generation
    this._appStore.dispatch(Actions.POINT_ADD, {...point, id: nanoid()});
    remove(this.#editPointView);
    this._appStore.dispatch(Actions.MODE_CHANGE, AppMode.READY);
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
