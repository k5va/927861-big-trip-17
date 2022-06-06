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

  async loadPoints() {
    return new Promise((resolve, reject) => {
      setTimeout(() => reject(Point.parseAll(generatePoints())), DATA_LOAD_DELAY);
    });
  }

  async loadOffers() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(Offer.parseAll(generateOffers())), DATA_LOAD_DELAY);
    });
  }

  async loadDestinations() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(generateDestinations()), DATA_LOAD_DELAY);
    });
  }

  async loadData() {
    return Promise.all([this.loadPoints(), this.loadOffers(), this.loadDestinations()])
      .then(([points, offers, destinations]) => ({points, offers, destinations}));
  }

  async addPoint(point) {
    return new Promise((resolve) => {
      setTimeout(() => resolve({...point, id: nanoid()}), DATA_LOAD_DELAY);
    });
  }

  async updatePoint(point) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(point), DATA_LOAD_DELAY);
    });
  }

  async deletePoint(point) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(point), DATA_LOAD_DELAY);
    });
  }
}
