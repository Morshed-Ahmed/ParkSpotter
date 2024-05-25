import { createSelector } from '@reduxjs/toolkit';

export const selectCurrentUser = state => state.user.currentUser;

export const selectCurrentUserMemoized = createSelector(
  selectCurrentUser,
  currentUser => currentUser
);