import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducers/storeReducer';

export default configureStore({
  reducer: {
    counter: counterReducer
  }
});