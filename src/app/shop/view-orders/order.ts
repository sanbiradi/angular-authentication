// Define an interface for the address object
interface Address {
    street: string;
    addressLine2: string;
    city: string;
    state: string;
    pin: string;
  }
  
  // Define an interface for the item object
 export default interface Item {
    productId: string;
    name: string;
    price: number;
    qty: number;
    subTotal: number;
    _id: string;
  }
  
  // Define an interface for the order object
  export default  interface Order {
    address: Address;
    _id: string;
    items: Item[];
    deliveryFee: number;
    total: number;
    paymentStatus: string;
    status: string;
    createdBy: string;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  