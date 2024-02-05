import { Product } from "./product"

export interface cart {
    products: Product[],
    price: number,
    login: boolean,
   
}

let a = localStorage.getItem('cart');
const localstg = a?JSON.parse(a):JSON.parse('{"products":[],"price":0}');

export const initalstate: cart = {
    products: localstg.products,
    price: localstg.price,
    login: localStorage.getItem('userLogined') ? true : false,
}
