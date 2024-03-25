import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth_slice.js';
import channelsReduser from './channels_slice'

export default configureStore({
  reducer: {
    auths: authReducer,
    channels: channelsReduser,
  },
});
