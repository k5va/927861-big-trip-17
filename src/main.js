import { RoutePresenter } from './presenter';
import { appStore, Actions } from './store';
import API from './api/api';

const api = API.getInstance();
const headContainer = document.querySelector('.trip-main');
const routeContainer = document.querySelector('.trip-events');
const routePresenter = new RoutePresenter(routeContainer, headContainer);

api.loadData().then((data) => appStore.dispatch(Actions.DATA_LOADED, data));
routePresenter.init();
