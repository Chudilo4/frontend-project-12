import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import {addChannel} from "./channels_slice";


const currentChannelAdapter = createEntityAdapter();


const currentChannelSlice = createSlice({
  name: 'currentChannel',
  initialState: {id: null, name: null},
  reducers: {
      setCurrentChannel: (state, action) => {
        state.id = action.payload.id;
        state.name = action.payload.name;
      },
  },
  extraReducers: (builder) => { // Дополнительные редьюсеры
    // При удалении поста нужно удалить все его комментарии
    builder.addCase(addChannel, (state, action) => {
      const {id, name} = action.payload;
      setCurrentChannel(state, {id: id, name: name})
    });
  },
});
export const { setCurrentChannel } = currentChannelSlice.actions
export const selectorsCurrentChannel = currentChannelAdapter.getSelectors((state) => state.currentChannel);
export default currentChannelSlice.reducer;