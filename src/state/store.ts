import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tenant from './tennant/tenant.slice';

export const store = configureStore({
  reducer: {
    tenant
  },
  middleware: getDefaultMiddleware => {
    const defaultMiddleware = getDefaultMiddleware({
      serializableCheck: false,
    });
    return defaultMiddleware
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
