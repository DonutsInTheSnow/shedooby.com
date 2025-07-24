'use client';

import { useEffect, useState } from 'react';
import { fetchMerch } from '@/lib/supabaseClient';
import Image from 'next/image';
import { useCart } from '@/lib/CartContext';

interface Merch {
  id: string;
  name: string;
  price: number;
  image: string;
  sizes: string[];
  price_id: string;
}

export default function Merch() {
  const [merch, setMerch] = useState<Merch[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});
  const [showSuccess, setShowSuccess] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const getMerch = async () => {
      const merchFromDB = await fetchMerch();
      setMerch(merchFromDB);
    };
    getMerch();
  }, []);

  const handleSizeChange = (merchId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [merchId]: size }));
  };

  return (
    <div className="min-h-screen bg-[#d7cdbc] pt-[120px] pb-[150px] px-2">
      <h2 className="font-inter text-[16px] font-semibold text-black text-center pb-4">Merch</h2>
      <div className="bg-[#cac0b0] h-[42px] mx-4"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto pt-7">
        {merch.length === 0 ? (
          <p className="text-center text-lg text-gray-800">No merch available.</p>
        ) : (
          merch.map((merch) => (
            <div key={merch.id} className="bg-white p-4 rounded-lg shadow-md text-center">
              <Image
                src={merch.image}
                alt={merch.name}
                width={300}
                height={300}
                className="w-full aspect-square object-cover rounded"
              />
              <h2 className="text-xl font-semibold text-gray-800 mt-2">{merch.name}</h2>
              <p className="text-gray-600">${(merch.price / 100).toFixed(2)}</p>
              {merch.sizes.length > 0 && (
                <div className="mt-2 text-amber-800">
                  <label htmlFor={`size-${merch.id}`} className="mr-2">
                    Select Size:
                  </label>
                  <select
                    id={`size-${merch.id}`}
                    value={selectedSizes[merch.id] || merch.sizes[0]}
                    onChange={(e) => handleSizeChange(merch.id, e.target.value)}
                    className="border rounded p-1"
                  >
                    {merch.sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <button
                onClick={() => {
                  addToCart(merch, selectedSizes[merch.id] || merch.sizes[0]);
                  setShowSuccess(`${merch.name} added to cart!`);
                  setTimeout(() => setShowSuccess(null), 3000);
                }}
                className="mt-2 bg-[#a1211f] text-white px-4 py-2 rounded hover:bg-[#80000d] transition"
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
      <div className="text-center mt-6">
        {showSuccess && (
          <div className="fixed inset-0 flex mx-auto items-center justify-center max-w-2xl max-h-50 m-7 bg-[#938978] rounded-2xl z-50">
            <p className="text-[35px] font-semibold text-yellow-400 px-4 rounded-lg">
              {showSuccess}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}