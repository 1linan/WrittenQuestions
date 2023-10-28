import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MessageState {
  messageApi: any;
}

const initialState: MessageState = {
  messageApi: null,
};
export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessageApi(state: MessageState, actions: PayloadAction<any>) {
      state.messageApi = actions.payload;
    },
  },
});

export const { setMessageApi } = messageSlice.actions;
