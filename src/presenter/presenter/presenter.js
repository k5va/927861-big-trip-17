export default class AbstractPresenter {
  _appStore = null;

  /**
   * Creates new instance of presenter
   */
  constructor(store) {
    if (new.target === AbstractPresenter) {
      throw new Error('Can\'t instantiate AbstractView, only concrete one.');
    }

    this._appStore = store;
  }
}
