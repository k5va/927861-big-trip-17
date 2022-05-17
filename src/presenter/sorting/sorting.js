import { remove, render } from '../../framework/render';
import { Sorting, DISABLED_SORTINGS } from '../../const';
import { SortView } from '../../view';
import Store from '../../store/store';

export default class SortingPresenter {
  #appStore = Store.getInstance();
  #sortingView = null;
  #container = null;

  /**
   * Creates new instance of presenter
   * @param {HTMLElement} container
   */
  constructor(container) {
    this.#container = container;
  }

  /**
   * Renders filter
   */
  init() {
    this.#sortingView = new SortView(this.#appStore.sorting, Object.values(Sorting), DISABLED_SORTINGS);
    this.#sortingView.setChangeHandler(this.#changeSortingHandler);
    render(this.#sortingView, this.#container);
  }

  /**
   * Change sorting handler
   * @param {String} sorting - new sorting
   */
  #changeSortingHandler = (sorting) => {
    this.#appStore.dispatch(Store.SORTING_CHANGE, sorting);
  };

  /**
   * Removes presenter's view
   */
  destroy() {
    remove(this.#sortingView);
  }
}
