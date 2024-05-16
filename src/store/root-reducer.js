import { combineReducers } from '@reduxjs/toolkit';
import {userReducer} from '../store/user/user.reducer'


export const rootReducer = combineReducers({
  user: userReducer,
});
