/**
 * Creates offers list template string
 * @param {Array<String>} selectedIds - array of selected offers' ids
 * @param {Array<Offer>} offers - array of available offers
 * @returns {String} template string
 */
const createOffersTemplate = (selectedIds, offers) => offers.map(({id, title, price}) => `
 <div class="event__offer-selector">
   <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}"
     type="checkbox" name="event-offer-${id}" value="${id}"
     ${selectedIds.some((selectedId) => selectedId === id) ? 'checked' : ''}>
   <label class="event__offer-label" for="event-offer-${id}">
     <span class="event__offer-title">${title}</span>
     &plus;&euro;&nbsp;
     <span class="event__offer-price">${price}</span>
   </label>
 </div>
`).join('');

export {createOffersTemplate};
