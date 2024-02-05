import { createAction, props } from "@ngrx/store";
import { Product } from "./product";

export const addproduct = createAction('addproduct', props<{ product: Product }>());
export const removeproduct = createAction('removeproduct', props<{ productId: string }>());
export const increaseqty = createAction('increaseqty', props<{ productId: string }>());
export const decreaseqty = createAction('decreaseqty', props<{ productId: string }>());
export const checklogin = createAction('checklogin');
export const emptycart = createAction('emptycart');
export const checkprice = createAction('checkprice');
export const cartCountLength = createAction('how many products')