import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit'
import axios from 'axios';
import route from '../routes.js'

export const fetchAuth = createAsyncThunk(
  'api/login/',
  async (data) => {
    const response = await axios.post(route.login, data);
    return response.data;
  },
);


const authSlice = createSlice({
  name: 'auths',
  initialState: { user: null, token: null },
  extraReducers: (builder) => {
    builder
      // Вызывается, если запрос успешно выполнился
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.state = action.payload;
        window.localStorage.setItem('token', action.payload.token);
      })
  },
})



export const { actions } = authSlice;
export default authSlice.reducer;
