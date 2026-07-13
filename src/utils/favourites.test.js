import { addToFavourites, removeFromFavourites, clearAllFavourites } from './favourites';

describe('favourites utility logic', () => {
  describe('addToFavourites', () => {
    it('Adding a property to an empty favourites list adds it correctly', () => {
      const result = addToFavourites([], 'prop-1');
      expect(result).toEqual(['prop-1']);
    });

    it('Adding a property that is already in the favourites list does NOT add a duplicate', () => {
      const initial = ['prop-1', 'prop-2'];
      const result = addToFavourites(initial, 'prop-2');
      expect(result).toEqual(['prop-1', 'prop-2']);
      // Ensure the same array reference is returned when no changes are made
      expect(result).toBe(initial);
    });
  });

  describe('removeFromFavourites', () => {
    it('Removing a property that exists in the favourites list removes only that property', () => {
      const result = removeFromFavourites(['prop-1', 'prop-2', 'prop-3'], 'prop-2');
      expect(result).toEqual(['prop-1', 'prop-3']);
    });

    it('Removing a property that does not exist in the list does not throw an error and leaves the list unchanged', () => {
      const initial = ['prop-1', 'prop-2'];
      const result = removeFromFavourites(initial, 'prop-3');
      expect(result).toEqual(['prop-1', 'prop-2']);
    });
  });

  describe('clearAllFavourites', () => {
    it('Clearing the favourites list empties it completely, even if it had multiple properties', () => {
      const result = clearAllFavourites(['prop-1', 'prop-2', 'prop-3']);
      expect(result).toEqual([]);
    });
  });
});
