import React from 'react';

const SmartTravelHacks: React.FC = () => (
  <div className="mb-8 shadow rounded-md p-6">
    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Smart Travel Hacks</h2>
    <div className="max-w-2xl">
      <ul className="list-disc pl-2 space-y-4 text-gray-800 dark:text-gray-200">
        <li className='list-none'>
          <span className="font-bold">Before You Go</span>
          <ul className="list-disc pl-6">
            <li>Book flights early; mid-week is cheaper.</li>
            <li>Download offline maps (Google Maps/Maps.me).</li>
            <li>Pack light: breathable clothes, sarong, reef-safe sunscreen.</li>
          </ul>
        </li>
        <li className='list-none'>
          <span className="font-bold">Getting Around</span>
          <ul className="list-disc pl-6">
            <li>Use Grab or Gojek for transport and delivery.</li>
            <li>Rent a scooter (with an international driving permit).</li>
            <li>Avoid airport taxis; walk a bit and order a ride via app.</li>
          </ul>
        </li>
        <li className='list-none'>
          <span className="font-bold">Money Tips</span>
          <ul className="list-disc pl-6">
            <li>Use ATMs at major banks.</li>
            <li>Bargain at markets with a smile (start at 50%).</li>
            <li>Tipping optional, but appreciated.</li>
          </ul>
        </li>
        <li className='list-none'>
          <span className="font-bold">Stay Smart</span>
          <ul className="list-disc pl-6">
            <li>Choose homestays/guesthouses for budget + local experience.</li>
            <li>Stay in Seminyak, Canggu, or Ubud for convenience.</li>
          </ul>
        </li>
        <li className='list-none'>
          <span className="font-bold">Food & Water</span>
          <ul className="list-disc pl-6">
            <li>Eat at local warungs (cheap + tasty).</li>
            <li>Drink bottled/filtered water only.</li>
            <li>Explore vegan spots in Ubud and Canggu.</li>
          </ul>
        </li>
        <li className='list-none'>
          <span className="font-bold">Explore Like a Pro</span>
          <ul className="list-disc pl-6">
            <li>Visit hotspots early to beat crowds.</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
);

export default SmartTravelHacks;
