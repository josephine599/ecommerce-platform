import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const addToCart = (product) => {

    const exist = cart.find(item => item._id === product._id);

    let updated;

    if (exist) {

      updated = cart.map(item =>
        item._id === product._id
          ? { ...exist, qty: exist.qty + product.qty || 1 }
          : item
      );

    } else {

      updated = [...cart, { ...product, qty: product.qty || 1 }];

    }

    setCart(updated);

    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (

    <CartContext.Provider value={{ cart, addToCart, setCart, clearCart }}>

      {children}

    </CartContext.Provider>

  );
}