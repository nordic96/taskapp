import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch, AppThunkDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppThunkDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
