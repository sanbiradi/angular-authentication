export interface Product {
    productId: string,
    name: string,
    price: number,
    qty: number,
    subTotal: number
    deal?: {
        price: number,
        discount: string,
        ends:string
    }
} 