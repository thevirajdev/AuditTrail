import { useState, useEffect } from 'react';

export interface CartItem {
  menuItem: {
    _id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
  specialInstructions?: string;
}

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to parse cart:', error);
      }
    }
  }, []);

  const addToCart = async (item: CartItem) => {
    try {
      setLoading(true);
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          menuItemId: item.menuItem._id,
          quantity: item.quantity,
          specialInstructions: item.specialInstructions,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      const existingIndex = cartItems.findIndex(
        (i) => i.menuItem._id === item.menuItem._id
      );

      let newItems;
      if (existingIndex >= 0) {
        newItems = cartItems.map((i, idx) =>
          idx === existingIndex
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        newItems = [...cartItems, item];
      }

      setCartItems(newItems);
      localStorage.setItem('cart', JSON.stringify(newItems));
    } catch (error) {
      console.error('Add to cart error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = (menuItemId: string, quantity: number) => {
    const newItems = cartItems
      .map((item) =>
        item.menuItem._id === menuItemId
          ? { ...item, quantity }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCartItems(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));
  };

  const removeFromCart = (menuItemId: string) => {
    const newItems = cartItems.filter(
      (item) => item.menuItem._id !== menuItemId
    );
    setCartItems(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );

  const count = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    total,
    count,
    loading,
  };
}
