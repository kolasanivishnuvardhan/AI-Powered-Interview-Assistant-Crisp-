import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import candidateReducer from './slices/candidateSlice';
import chatReducer from './slices/chatSlice';
import answersReducer from './slices/answersSlice';
import candidatesReducer from './slices/candidatesSlice';

const rootReducer = combineReducers({
  candidate: candidateReducer,
  chat: chatReducer,
  answers: answersReducer,
  candidates: candidatesReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['candidate', 'candidates'], // Persist current candidate and historical candidates
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;