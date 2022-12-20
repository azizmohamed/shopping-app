import checkoutReducer, {
    addToCart, CheckoutState
  } from '../checkoutSlice';
  
  describe('checkout reducer', () => {
    const initialState: CheckoutState = {
      products: [],
      status: 'idle',
    };
    
    it('should handle initial state', () => {
      expect(checkoutReducer(undefined, { type: 'unknown' })).toEqual({
        products: [],
      status: 'idle',
      });
    });
  
    it('should handle add to cart', () => {
      const actual = checkoutReducer(initialState, addToCart({ id: '1', name: 'test', price: 1, quantity: 1 }));
      expect(actual.products).toEqual([{ id: '1', name: 'test', price: 1, quantity: 1 }]);
    });
  });
  