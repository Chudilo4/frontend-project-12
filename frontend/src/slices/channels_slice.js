import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {LocalRoute} from '../routes'

export const GetChannels = createAsyncThunk(
    'GetChannels',
    async () => {
    const token = window.localStorage.getItem('token')
    const response = await axios.get(LocalRoute.channelsApi, {headers: { Authorization: `Bearer ${token}`,},});
    return response.data;
});

export const PostChannel = createAsyncThunk(
  'PostChannel',
  async (values) => {
    const token = window.localStorage.getItem('token')
    const newChannel = { name: values.name };
    const response = await axios.post(LocalRoute.channelsApi, newChannel, {headers: {Authorization: `Bearer ${token}`,},});
    return response.data
  }
)

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    removeChannel: channelsAdapter.removeOne,
    updateChannel: channelsAdapter.updateOne,
  },
  extraReducers: (builder) => {
      builder
          .addCase(GetChannels.pending, (state) => {})
          .addCase(GetChannels.fulfilled, (state, action) => {
            channelsAdapter.addMany(state, action.payload);
          })
          .addCase(GetChannels.rejected, (state, {payload}) => {})
          .addCase(PostChannel.pending, () => {})
          .addCase(PostChannel.fulfilled, (state, action) => {
            channelsAdapter.addOne(state, action.payload);
          })
          .addCase(PostChannel.rejected, (state, {payload}) => {})
    },
});
export const { addChannel, addChannels, removeChannel, updateChannel } = channelsSlice.actions;
export const selectorsChannels = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;