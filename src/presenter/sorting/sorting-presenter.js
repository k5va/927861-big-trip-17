import { remove, render } from '../../framework/render';
import { Sorting, DISABLED_SORTINGS } from '../../const';
import { SortView } from '../../view';
import { AbstractPresenter } from '../../presenter';
import { Actions } from '../../store';

export default class SortingPresenter extends AbstractPresenter {
  #sortingView = null;
  #container = null;

  /**
   * Creates new instance of presenter
   * @param {HTMLElement} container - DOM container
   */
  constructor(container) {
    super();

    this.#container = container;
  }

  /**
   * Renders filter
   */
  init() {
    const {sorting} = this._appStore.state;
    this.#sortingView = new SortView(sorting, Object.values(Sorting), DISABLED_SORTINGS);
    this.#sortingView.setChangeHandler(this.#changeSortingHandler);
    render(this.#sortingView, this.#container);
  }

  /**
   * Change sorting handler
   * @param {String} newSorting - new sorting
   */
  #changeSortingHandler = (newSorting) => {
    const {sorting} = this._appStore.state;
    if (newSorting !== sorting) {
      this._appStore.dispatch(Actions.SORTING_CHANGE, newSorting);
    }
  };

  /**
   * Removes presenter's view
   */
  destroy() {
    remove(this.#sortingView);
  }
}
