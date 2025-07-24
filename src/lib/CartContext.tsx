'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface Merch {
  id: string;
  name: string;
  price: number;
  image: string;
  sizes: string[];
  price_id: string;
}

interface CartItem extends Merch {
  quantity: number;
  selectedSize: string; // Add selected size
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (merch: Merch, selectedSize: string) => void; // Update to include size
  removeFromCart: (merchId: string) => void;
  updateQuantity: (merchId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (merch: Merch, selectedSize: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === merch.id && item.selectedSize === selectedSize
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === merch.id && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...merch, quantity: 1, selectedSize }];
    });
  };

  const removeFromCart = (merchId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== merchId));
  };

  const updateQuantity = (merchId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === merchId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
