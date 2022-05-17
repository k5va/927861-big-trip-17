/**
 * Filters offers by given type and ids
 * @param {Object} offers - offers data
 * @param {String} type - offer type
 * @param {Array<String>} - ids
 * @returns {Array<Offer>} - array of offers
 */
const filterOffers = (offers, type, ids) => {
  const typeOffers = offers[type] ? [...offers[type]] : [];
  if (ids) {
    return typeOffers.filter((offer) => ids.some((id) => id === offer.id));
  }

  return typeOffers;
};

export default filterOffers;
