import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user.js';

// إعدادات التخزين
const persistConfig = {
  key: 'user', // مفتاح التخزين
  storage, // LocalStorage
  whitelist: ['user'], // نحفظ فقط بيانات المستخدم
};

// ربط المخزن مع Redux Persist
const persistedUserReducer = persistReducer(persistConfig, userReducer);

// تكوين المخزن
export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// إنشاء الـ persistor
export const persistor = persistStore(store);
