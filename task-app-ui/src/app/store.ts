import { configureStore, ThunkAction, Action, ThunkDispatch, AnyAction } from '@reduxjs/toolkit';

import TaskReducer from '../features/tasks/taskReducer';

export const store = configureStore({
  reducer: {
    page_task: TaskReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  null,
  Action<string>
>;
export type AppThunkDispatch = ThunkDispatch<RootState, null, AnyAction>;