import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
  } from 'redux-persist';
  
  import authReducer from './auth/auth-reducer';
  import { configureStore } from '@reduxjs/toolkit';
  import contactsReducer from './contacts/contacts-reducer';
  import storage from 'redux-persist/lib/storage';
  
  const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token'],
  };
  
  export const store = configureStore({
    reducer: {
      auth: persistReducer(authPersistConfig, authReducer),
      contacts: contactsReducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    devTools: process.env.NODE_ENV === 'development',
  });
  
  export const persistor = persistStore(store);