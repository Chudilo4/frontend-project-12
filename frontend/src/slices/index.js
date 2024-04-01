import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channels_slice'
import messagesReducer from './message_slice'
import currentChannelReducer from './CurrentChannelSlice'

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    currentChannel: currentChannelReducer,
  }
});
