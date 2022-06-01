import API from '../../api/api';
import { appStore } from '../../store';

export default class AbstractPresenter {
  _appStore = appStore;
  _api = API.getInstance();

  /**
   * Creates new instance of presenter
   */
  constructor() {
    if (new.target === AbstractPresenter) {
      throw new Error('Can\'t instantiate AbstractView, only concrete one.');
    }
  }
}
