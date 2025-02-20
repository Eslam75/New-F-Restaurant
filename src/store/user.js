import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // تحديث بيانات المستخدم
    userDetails: (state, action) => {
      if (action.payload) {
        state.user = action.payload;
      }
    },

    // مسح بيانات المستخدم (مثلاً عند تسجيل الخروج)
    clearUser: (state) => {
      state.user = null;
    },
  },
});

// تصدير الـ actions
export const { userDetails, clearUser } = userSlice.actions;

// تصدير الـ reducer لاستخدامه في store
export default userSlice.reducer;
