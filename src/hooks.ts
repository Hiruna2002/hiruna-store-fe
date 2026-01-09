import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './redux/store'; 

// Typed versions භාවිතා කරන්න පුළුවන්
export const useAppDispatch = () => useDispatch<AppDispatch>();

// මේක තමයි ඔයා බොහෝමයක් භාවිතා කරන්න ඕනේ එක
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;