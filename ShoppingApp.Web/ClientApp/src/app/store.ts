import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { shoppingApi } from '../Api/shoppingApi';
import checkoutReducer from '../features/checkout/checkoutSlice';

export const store = configureStore({
  reducer: {
    api: shoppingApi.reducer,
    checkout: checkoutReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shoppingApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
