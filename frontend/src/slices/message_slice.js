import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {LocalRoute} from '../routes'

export const GetMessages = createAsyncThunk(
    'messages/GetMessages',
    async () => {
    const token = window.localStorage.getItem('token')
    const response = await axios.get(LocalRoute.messagesApi, {headers: { Authorization: `Bearer ${token}`,},});
    return response.data;
});

export const PostMessage = createAsyncThunk(
  'messages/PostMessages',
  async (values) => {
  const username = window.localStorage.getItem('username');
  const token = window.localStorage.getItem('token');
  const newMessage = { body: values.text, channelId: values.currentChannel.id, username: username };
  const response = await axios.post(LocalRoute.messagesApi, newMessage, {headers: {Authorization: `Bearer ${token}`}});
  return response.data;
  }
)

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
    removeMessage: messagesAdapter.removeOne,
    updateMessage: messagesAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder
        .addCase(GetMessages.pending, (state) => {
        })
        .addCase(GetMessages.fulfilled, (state, action) => {
          messagesAdapter.addMany(state, action.payload);
        })
        .addCase(GetMessages.rejected, (state, {payload}) => {
        });
  },
});
export const { addMessage, addMessages, removeMessage, updateMessage } = messagesSlice.actions;
export const selectorsMessages = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;