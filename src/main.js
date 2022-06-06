import { RoutePresenter } from './presenter';
import { appStore, Actions } from './store';
import API from './api/api';

const api = API.getInstance();
const headContainer = document.querySelector('.trip-main');
const routeContainer = document.querySelector('.trip-events');
const routePresenter = new RoutePresenter(routeContainer, headContainer);
routePresenter.init();

(async () => {
  try {
    const data = await api.loadData();
    appStore.dispatch(Actions.DATA_LOADED, data);
  } catch (err) {
    appStore.dispatch(Actions.DATA_ERROR);
  }
})();
