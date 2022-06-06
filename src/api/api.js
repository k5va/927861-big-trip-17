import { Destination, Offer, Point } from '../model';
import {nanoid} from 'nanoid';
import ApiService from '../framework/api-service';

const DATA_LOAD_DELAY = 2000;
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip';
const AUTH_TOKEN = 'Basic eo0w5dasdqw122a';
const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
};

export default class API extends ApiService {

  static #instance = null;

  /**
   * Creates new instance of API
   */
  constructor() {
    if (API.#instance) {
      return API.#instance;
    }

    super(END_POINT, AUTH_TOKEN);
    API.#instance = this;
  }

  /**
   * Returns API instance (singleton)
   * @returns {API} - API instance
   */
  static getInstance() {
    return new API();
  }

  /**
   * Loads points from remote server
   * @returns {Promise<Array<Point>>} - points
   */
  async loadPoints() {
    const response = await this._load({url: 'points'});
    const data = await ApiService.parseResponse(response);
    return Point.parseAll(data);
  }

  /**
   * Loads offers from remote server
   * @returns {Promise<*>} - offers
   */
  async loadOffers() {
    const response = await this._load({url: 'offers'});
    const data = await ApiService.parseResponse(response);
    return Offer.parseAll(data);
  }

  /**
   * Loads destinations from remote server
   * @returns {Promise<Array<Destination>>} - destinations
   */
  async loadDestinations() {
    const response = await this._load({url: 'destinations'});
    const data = await ApiService.parseResponse(response);
    return Destination.parseAll(data);
  }

  /**
   * Loads all data from remote server
   * @returns {Promise<*>} - data
   */
  async loadData() {
    return Promise.all([this.loadPoints(), this.loadOffers(), this.loadDestinations()])
      .then(([points, offers, destinations]) => ({points, offers, destinations}));
  }

  async addPoint(point) {
    return new Promise((resolve) => {
      setTimeout(() => resolve({...point, id: nanoid()}), DATA_LOAD_DELAY);
    });
  }

  /**
   * Updates point on remote server
   * @param {Point} point - point
   * @returns {Promise<Point>} - updated point
   */
  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: HTTP_METHOD.PUT,
      body: JSON.stringify(point.serialize()),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const data = await ApiService.parseResponse(response);
    return Point.parse(data);
  }

  async deletePoint(point) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(point), DATA_LOAD_DELAY);
    });
  }
}
