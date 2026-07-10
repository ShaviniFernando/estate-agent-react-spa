/**
 * Filters a properties array based on search criteria.
 *
 * @param {Array} properties - The full list of property objects.
 * @param {Object} criteria - The filter criteria.
 * @param {string} criteria.type      - Property type ('Any', 'House', 'Flat')
 * @param {string} criteria.minPrice  - Minimum price (empty string = no filter)
 * @param {string} criteria.maxPrice  - Maximum price (empty string = no filter)
 * @param {string} criteria.minBedrooms - Min bedrooms (empty string = no filter)
 * @param {string} criteria.maxBedrooms - Max bedrooms (empty string = no filter)
 * @param {string} criteria.postcode  - Postcode prefix (empty string = no filter)
 * @returns {Array} Filtered array of properties.
 */
export function filterProperties(properties, criteria) {
  return properties.filter((property) => {
    if (criteria.type && criteria.type !== 'Any') {
      if (property.type !== criteria.type) {
        return false;
      }
    }
    if (criteria.minPrice !== '') {
      if (property.price < Number(criteria.minPrice)) {
        return false;
      }
    }
    if (criteria.maxPrice !== '') {
      if (property.price > Number(criteria.maxPrice)) {
        return false;
      }
    }
    if (criteria.minBedrooms !== '') {
      if (property.bedrooms < Number(criteria.minBedrooms)) {
        return false;
      }
    }
    if (criteria.maxBedrooms !== '') {
      if (property.bedrooms > Number(criteria.maxBedrooms)) {
        return false;
      }
    }
    if (criteria.postcode !== '') {
      if (!property.postcode.toLowerCase().startsWith(criteria.postcode.toLowerCase())) {
        return false;
      }
    }
    return true;
  });
}
