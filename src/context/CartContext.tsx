"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  img: string;
};

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  isLoaderActive: boolean;
  loaderTarget: string | null;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  clearCart: () => void;
  setIsCartOpen: (val: boolean) => void;
  setIsCheckoutOpen: (val: boolean) => void;
  triggerLoader: (targetId: string) => void;
  finishLoader: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const [loaderTarget, setLoaderTarget] = useState<string | null>(null);

  const addToCart = (product: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setItems((prev) => prev.map((i) => {
      if (i.id === id) {
        const newQ = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQ };
      }
      return i;
    }));
  };

  const clearCart = () => setItems([]);

  const triggerLoader = (targetId: string) => {
    setLoaderTarget(targetId);
    setIsLoaderActive(true);
  };

  const finishLoader = () => {
    setIsLoaderActive(false);
    setLoaderTarget(null);
  };

  return (
    <CartContext.Provider value={{
      items, isCartOpen, isCheckoutOpen, isLoaderActive, loaderTarget,
      addToCart, removeFromCart, updateQuantity, clearCart,
      setIsCartOpen, setIsCheckoutOpen, triggerLoader, finishLoader
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
