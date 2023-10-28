import { configureStore } from '@reduxjs/toolkit';
import { messageSlice } from './slices/message';
import { userSlice } from './slices/user';

//configureStore挂载每一个modules
const store = configureStore({
  reducer: {
    user: userSlice.reducer, //user module
    message: messageSlice.reducer,
  },
  devTools: true,
});

//定义 ts types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//导出store
export default store;
