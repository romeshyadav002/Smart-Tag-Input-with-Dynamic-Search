'use client';

import React, { useState } from 'react';
import SmartTagInput from '@/components/SmartTagInput/SmartTagInput';

const TAG_COLORS = [
  { label: 'Blue', value: 'bg-blue-500' },
  { label: 'Red', value: 'bg-red-500' },
  { label: 'Green', value: 'bg-green-500' },
  { label: 'Yellow', value: 'bg-yellow-400' },
  { label: 'Purple', value: 'bg-purple-500' },
];

export default function Home() {
  const [tagColor, setTagColor] = useState(TAG_COLORS[0].value);

  return (
    <main className="min-h-screen p-8 bg-gray-100 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Smart Tag Input Demo</h1>
      <div className="flex flex-row justify-center items-center mb-10 gap-4">
        <label htmlFor="tagColor" className="block  font-semibold">
          Select Tag Color:
        </label>
        <select
          id="tagColor"
          className="p-2 border rounded flex items-center"
          value={tagColor}
          onChange={(e) => setTagColor(e.target.value)}
        >
          {TAG_COLORS.map((color) => (
            <option key={color.value} value={color.value}>
              {color.label}
            </option>
          ))}
        </select>
      </div>
      <SmartTagInput
        onChange={(tags) => console.log(tags)}
        tagColor={tagColor}
      />
    </main>
  );
}
