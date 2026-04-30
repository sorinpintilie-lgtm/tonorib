import Link from 'next/link';

export default function Auction() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold font-manrope mb-6">Live Auctions</h1>
      <p className="text-silver-100 mb-8">
        Participate in live auctions for fresh fish, seafood, and aquaculture equipment.
        Bid in real-time and win great deals!
      </p>
      <div className="mb-8">
         <div className="flex items-center space-x-3 mb-4">
           <input
             type="text"
             placeholder="Search auctions..."
             onChange={(e: React.ChangeEvent<HTMLInputElement>)}
             className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-silver-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
           />
           <button className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors">
             Search
           </button>
         </div>
        <div className="flex space-x-4 mb-6">
          <Link href="/auction/create" className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors">
            Start an Auction
          </Link>
          <a href="#" className="px-6 py-3 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
            All Categories
          </a>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Auction Item 1 */}
        <Link href="/auction/1" className="group block bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors">
          <div className="relative">
            <div className="absolute top-2 right-2 bg-teal-600 text-white text-xs px-2 py-1 rounded">LIVE</div>
            <div className="aspect-w-4 aspect-h-3 bg-gray-200">
              <svg className="h-full w-full text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3M6 6l6 6m8-8V4a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V6"></path></svg>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold font-manrope mb-2">Premium Sea Bass Lot</h3>
            <p className="text-silver-100 text-sm mb-2">Fresh catch from the Adriatic Sea, approximately 50kg</p>
            <div className="flex items-center mb-4">
              <span className="mr-4 text-teal-400 font-medium">Current Bid:</span>
              <span className="text-xl font-bold text-white">€120</span>
            </div>
            <div className="flex items-center mb-4">
              <span className="mr-4 text-silver-100">Time Left:</span>
              <span className="text-teal-400 font-medium">02:15:30</span>
            </div>
            <button className="w-full px-5 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors">
              Place Bid
            </button>
          </div>
        </Link>
        {/* Auction Item 2 */}
        <Link href="/auction/2" className="group block bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors">
          <div className="relative">
            <div className="absolute top-2 right-2 bg-teal-600 text-white text-xs px-2 py-1 rounded">LIVE</div>
            <div className="aspect-w-4 aspect-h-3 bg-gray-200">
              <svg className="h-full w-full text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m2 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold font-manrope mb-2">Aquaculture Equipment Bundle</h3>
            <p className="text-silver-100 text-sm mb-2">Filters, pumps, and aeration systems for medium-sized farms</p>
            <div className="flex items-center mb-4">
              <span className="mr-4 text-teal-400 font-medium">Current Bid:</span>
              <span className="text-xl font-bold text-white">€850</span>
            </div>
            <div className="flex items-center mb-4">
              <span className="mr-4 text-silver-100">Time Left:</span>
              <span className="text-teal-400 font-medium">01:45:12</span>
            </div>
            <button className="w-full px-5 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors">
              Place Bid
            </button>
          </div>
        </Link>
        {/* Auction Item 3 */}
        <Link href="/auction/3" className="group block bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors">
          <div className="relative">
            <div className="absolute top-2 right-2 bg-teal-600 text-white text-xs px-2 py-1 rounded">UPCOMING</div>
            <div className="aspect-w-4 aspect-h-3 bg-gray-200">
              <svg className="h-full w-full text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3M6 6l6 6m8-8z"></path></svg>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold font-manrope mb-2">Live Tilapia Auction</h3>
            <p className="text-silver-100 text-sm mb-2">1000pcs live tilapia, ready for delivery</p>
            <div className="flex items-center mb-4">
              <span className="mr-4 text-teal-400 font-medium">Starting Bid:</span>
              <span className="text-xl font-bold text-white">€300</span>
            </div>
            <div className="flex items-center mb-4">
              <span className="mr-4 text-silver-100">Starts In:</span>
              <span className="text-teal-400 font-medium">04:20:00</span>
            </div>
            <button className="w-full px-5 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors">
              Get Reminder
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}