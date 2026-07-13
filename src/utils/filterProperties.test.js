import { filterProperties } from './filterProperties';
import properties from '../data/properties';

const defaultCriteria = {
  type: 'Any',
  minPrice: '',
  maxPrice: '',
  minBedrooms: '',
  maxBedrooms: '',
  postcode: '',
};

describe('filterProperties', () => {
  it('returns all 7 properties when criteria has all empty/default values', () => {
    const result = filterProperties(properties, defaultCriteria);
    expect(result).toHaveLength(7);
  });

  it('returns only House properties when type is "House"', () => {
    const result = filterProperties(properties, { ...defaultCriteria, type: 'House' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach((p) => expect(p.type).toBe('House'));
  });

  it('returns only properties with price >= minPrice when minPrice is set', () => {
    const result = filterProperties(properties, { ...defaultCriteria, minPrice: '50000000' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach((p) => expect(p.price).toBeGreaterThanOrEqual(50000000));
  });

  it('combines type + minBedrooms + postcode filters and returns the correct subset', () => {
    // prop4 is a House, 4 bed, postcode '200' (Kandy) — should match prefix '2'
    // prop2 is a Flat (not a House) in postcode '003' — should NOT match
    const result = filterProperties(properties, {
      ...defaultCriteria,
      type: 'House',
      minBedrooms: '3',
      postcode: '2',
    });
    expect(result.length).toBeGreaterThan(0);
    result.forEach((p) => {
      expect(p.type).toBe('House');
      expect(p.bedrooms).toBeGreaterThanOrEqual(3);
      expect(p.postcode.toLowerCase()).toMatch(/^2/);
    });
  });

  it('returns an empty array when criteria excludes every property', () => {
    const result = filterProperties(properties, {
      ...defaultCriteria,
      minPrice: '999999999',
    });
    expect(result).toHaveLength(0);
  });

  it('filters by dateFrom correctly', () => {
    // Only properties added on or after 2024-01-01
    const result = filterProperties(properties, { ...defaultCriteria, dateFrom: '2024-01-01' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach((p) => expect(p.addedDate >= '2024-01-01').toBe(true));
  });

  it('filters by dateTo correctly', () => {
    // Only properties added on or before 2023-12-31
    const result = filterProperties(properties, { ...defaultCriteria, dateTo: '2023-12-31' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach((p) => expect(p.addedDate <= '2023-12-31').toBe(true));
  });

  it('filters by date range (dateFrom and dateTo)', () => {
    // Properties between 2023-01-01 and 2024-12-31
    const result = filterProperties(properties, {
      ...defaultCriteria,
      dateFrom: '2023-01-01',
      dateTo: '2024-12-31',
    });
    expect(result.length).toBeGreaterThan(0);
    result.forEach((p) => {
      expect(p.addedDate >= '2023-01-01').toBe(true);
      expect(p.addedDate <= '2024-12-31').toBe(true);
    });
  });
});
