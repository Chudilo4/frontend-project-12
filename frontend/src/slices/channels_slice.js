/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import route from '../routes'

export const fetchData = createAsyncThunk(
    'channels/fetchData',
    async () => {
    const token = window.localStorage.getItem('token')
    const response = await axios.get(route.channelsApi, {headers: { Authorization: `Bearer ${token}`,},});
    return response.data;
});

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
          .addCase(fetchData.pending, (state) => {
          })
          .addCase(fetchData.fulfilled, (state, action) => {
            channelsAdapter.addMany(state, action.payload);
          })
          .addCase(fetchData.rejected, (state, {payload}) => {
          });
    },
});
export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;