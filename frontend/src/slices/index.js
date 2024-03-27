import { configureStore } from '@reduxjs/toolkit';
import {AuthenticatedApi} from './auth_slice.js';
import channelsReduser from './channels_slice'
import {messagesApi} from './message_slice'

export default configureStore({
  reducer: {
    [AuthenticatedApi.reducerPath]: AuthenticatedApi.reducer,
    channels: channelsReduser,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(messagesApi.middleware),
});
