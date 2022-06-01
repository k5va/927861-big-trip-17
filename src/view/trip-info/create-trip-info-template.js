import { formatDate } from '../../utils';
import { createDestinationsTemplate } from './create-destinations-template';

/**
 * Creates trip infor template
 * @param {Array<String>} destinations - array of trip's destinations
 * @param {Date} startDate - trip's start date
 * @param {Date} endDate - trip's end date
 * @param {Number} cost - trip's cost
 * @returns {String} template
 */
const createTripInfoTemplate = (destinations, startDate, endDate, cost) => `
  <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      ${createDestinationsTemplate(destinations)}
      <p class="trip-info__dates">
        ${startDate ? formatDate(startDate, 'MMM DD') : ''}
        &nbsp;&mdash;&nbsp;
        ${endDate ? formatDate(endDate, 'MMM DD') : ''}
      </p>
    </div>
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
    </p>
  </section>
`;

export {createTripInfoTemplate};
