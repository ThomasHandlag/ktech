import React, { useContext } from "react";
import type { Product } from "./day5_homework3";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export const CartContext = React.createContext({
  cartItems: [] as CartItem[],
  addItem: (product: Product) => {console.log(product);},
  decreaseItem: (productId: number) => {console.log(productId);},
  removeItem: (productId: number) => {console.log(productId);},
});

export const useCart = () => useContext(CartContext);
