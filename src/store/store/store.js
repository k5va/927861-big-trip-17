import Observable from '../../framework/observable';

export default class Store extends Observable {
  #state= null;
  #reducer = null;

  /**
   * Creates an instamce of Store
   * @param {Function} reducer - reducer
   */
  constructor(reducer) {
    super();

    this.#reducer = reducer;
    this.#state = reducer(undefined, {});
  }

  /**
   * state getter
   * @returns {*} - state
   */
  get state() {
    return {...this.#state};
  }

  /**
   * Dispatches actions to store and modifies it
   * @param {String} action - action
   * @param {*} payload - payload
   */
  dispatch(action, payload) {
    this.#state = this.#reducer(this.#state, action, payload);
    this._notify(action, payload);
  }
}
