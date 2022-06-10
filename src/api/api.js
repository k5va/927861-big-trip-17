import { Destination, Offer, Point } from '../model';
import ApiService from '../framework/api-service';

const END_POINT = 'https://17.ecmascript.pages.academy/big-trip';
const AUTH_TOKEN = 'Basic eo0w5dasdqw122a';
const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
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

  /**
   * Adds new point to remote server
   * @param {Point} point - new point
   * @returns {Promise<Point>} - created point from remote server
   */
  async addPoint(point) {
    const response = await this._load({
      url: 'points',
      method: HTTP_METHOD.POST,
      body: JSON.stringify(point.serialize()),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const data = await ApiService.parseResponse(response);
    return Point.parse(data);
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

  /**
   * Deletes point
   * @param {Point} point - point to be deleted
   * @returns {Promise<Point>} - deleted point
   */
  async deletePoint(point) {
    await this._load({
      url: `points/${point.id}`,
      method: HTTP_METHOD.DELETE,
      body: JSON.stringify(point.serialize()),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    return point;
  }
}
