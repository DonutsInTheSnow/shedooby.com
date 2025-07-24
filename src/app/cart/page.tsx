'use client';

import { useCart } from '@/lib/CartContext';
import Image from 'next/image';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Checkout failed');
      window.location.href = data.url;
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to initiate checkout. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#d7cdbc] pt-[120px] pb-[150px] px-2">
      <h2 className="font-inter text-[16px] font-semibold text-black text-center pb-4">Your Cart</h2>
      <div className="bg-[#cac0b0] h-[42px] mx-4 mb-7"></div>
      {cart.length === 0 ? (
        <p className="text-center text-lg text-gray-800">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 max-w-6xl mx-auto">
          {cart.map((item) => (
            <div key={`${item.id}-${item.selectedSize}`} className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center gap-4">
              <Image src={item.image} alt={item.name} width={100} height={100} className="w-24 h-24 aspect-square object-cover rounded-md" />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                <p className="text-gray-600">${(item.price / 100).toFixed(2)} x {item.quantity}</p>
                {item.selectedSize && (
                  <p className="text-gray-600">Size: {item.selectedSize}</p>
                )}
              </div>
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700 focus:ring-2 focus:ring-gray-500">-</button>
                <span className="text-gray-800">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 focus:ring-2 focus:ring-gray-500">+</button>
                <button onClick={() => removeFromCart(item.id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 focus:ring-2 focus:ring-red-500">Remove</button>
              </div>
            </div>
          ))}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xl font-bold text-gray-800">Total: ${(cart.reduce((total, item) => total + (item.price / 100) * item.quantity, 0)).toFixed(2)}</p>
            <div className="flex gap-2">
              <button onClick={clearCart} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:ring-2 focus:ring-gray-400">Clear Cart</button>
              <button onClick={handleCheckout} className="bg-[#24572b] text-white px-4 py-2 rounded hover:bg-black focus:ring-2 focus:ring-green-500">Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}