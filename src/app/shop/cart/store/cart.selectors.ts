import { createFeatureSelector,createSelector } from "@ngrx/store";
import { cart } from "./cart.state";

// Select the cart feature state
export const selectCartState = createFeatureSelector<cart>('cart');

// Create a selector to get the array of products
export const selectProducts = createSelector(
  selectCartState,
  (state) => state.products
);

// Create a selector to get the count of products
export const selectProductCount = createSelector(
  selectProducts,
  (products) => products.length
);


