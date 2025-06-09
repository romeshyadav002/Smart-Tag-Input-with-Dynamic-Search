'use client';

import SmartTagInput from '@/components/SmartTagInput/SmartTagInput';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Smart Tag Input Demo</h1>
      <SmartTagInput onChange={(tags) => console.log(tags)} />
    </main>
  );
}
