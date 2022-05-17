import Store from '../../store/store';

export default class AbstractPresenter {
  _appStore = Store.getInstance();
  _api = null;

  /**
   * Creates new instance of presenter
   */
  constructor() {
    if (new.target === AbstractPresenter) {
      throw new Error('Can\'t instantiate AbstractView, only concrete one.');
    }
  }
}
