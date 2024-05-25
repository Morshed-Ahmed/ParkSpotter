import { createSelector } from "@reduxjs/toolkit";

const selectPaymentSlice = (state) => state.payment;

export const selectSubscriptionAmount = (state) =>
  selectPaymentSlice(state).subscriptionAmount;

export const selectPaymentType = (state) =>
  selectPaymentSlice(state).paymentType;

export const selectPaymentDate = (state) =>
  selectPaymentSlice(state).paymentDate;

export const selectSubscriptionAmountMemoized = createSelector(
  [selectSubscriptionAmount],
  (subscriptionAmount) => subscriptionAmount
);

export const selectPaymentTypeMemoized = createSelector(
  [selectPaymentType],
  (paymentType) => paymentType
);

export const selectPaymentDateMemoized = createSelector(
  [selectPaymentDate],
  (paymentDate) => paymentDate
);
