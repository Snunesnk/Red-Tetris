import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './Reducers/storeReducer';

export default configureStore({
  reducer: {
    counter: counterReducer
  }
});