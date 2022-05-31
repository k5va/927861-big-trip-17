import { generateOffers } from '../mock/generate-offers';
import { generateDestinations } from '../mock/generate-destinations';
import { generatePoints } from '../mock/generate-points';
import { Offer, Point } from '../model';
import {nanoid} from 'nanoid';

const DATA_LOAD_DELAY = 2000;

export default class API {

  static #instance = null;

  constructor() {
    if (API.#instance) {
      return API.#instance;
    }

    API.#instance = this;
  }

  static getInstance() {
    return new API();
  }

  loadPoints() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(Point.parseAll(generatePoints())), DATA_LOAD_DELAY);
    });
  }

  loadOffers() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(Offer.parseAll(generateOffers())), DATA_LOAD_DELAY);
    });
  }

  loadDestinations() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(generateDestinations()), DATA_LOAD_DELAY);
    });
  }

  loadData() {
    return Promise.all([this.loadPoints(), this.loadOffers(), this.loadDestinations()])
      .then(([points, offers, destinations]) => ({points, offers, destinations}));
  }

  addPoint(point) {
    return new Promise((resolve) => {
      setTimeout(() => resolve({...point, id: nanoid()}), DATA_LOAD_DELAY);
    });
  }

  updatePoint(point) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(point), DATA_LOAD_DELAY);
    });
  }

  deletePoint(point) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(point), DATA_LOAD_DELAY);
    });
  }
}
