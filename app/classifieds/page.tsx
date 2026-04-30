import Link from 'next/link';

export default function Classifieds() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold font-manrope mb-6">Classifieds</h1>
      <p className="text-silver-100 mb-4">
        Buy and sell fish farming equipment, services, and more in our classifieds section.
      </p>
      <div className="mb-8">
         <div className="flex items-center space-x-3 mb-4">
           <input
             type="text"
             placeholder="Search classifieds..."
             onChange={(e: React.ChangeEvent<HTMLInputElement>)}
             className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-silver-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
           />
           <button className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors">
             Search
           </button>
         </div>
        <div className="flex space-x-4 mb-6">
          <Link href="/classifieds/create" className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors">
            Post a Classified
          </Link>
          <a href="#" className="px-6 py-3 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
            All Categories
          </a>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Classified Card 1 */}
        <Link href="/classifieds/1" className="group block bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.737 1.707h17.414c.921 0 1.366-.807.737-1.707L20.705 5.293a1 1 0 00-1.414-1.414L12 9l-4.293-4.293a1 1 0 00-1.414 1.414L5.4 12H19l4 8z"></path></svg>
            </div>
            <div>
              <h3 className="font-semibold font-manrope mb-2">Used Fish Farming Equipment</h3>
              <p className="text-silver-100 text-sm mb-2">Complete set of tanks, filters, and pumps for sale. In good condition.</p>
              <span className="bg-teal-600/20 text-teal-400 text-xs px-2 py-1 rounded">Equipment</span>
              <span className="ml-2 text-silver-100 text-xs">€1,200</span>
            </div>
          </div>
        </Link>
        {/* Classified Card 2 */}
        <Link href="/classifieds/2" className="group block bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></svg>
            </div>
            <div>
              <h3 className="font-semibold font-manrope mb-2">Fish Feed Supply Contract</h3>
              <p className="text-silver-100 text-sm mb-2">Long-term supply agreement for high-quality fish feed. Available immediately.</p>
              <span className="bg-teal-600/20 text-teal-400 text-xs px-2 py-1 rounded">Services</span>
              <span className="ml-2 text-silver-100 text-xs">Contact for pricing</span>
            </div>
          </div>
        </Link>
        {/* Classified Card 3 */}
        <Link href="/classifieds/3" className="group block bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m2 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div>
              <h3 className="font-semibold font-manrope mb-2">Wanted: Fish Farm Consultant</h3>
              <p className="text-silver-100 text-sm mb-2">Experienced consultant needed for setting up a new tilapia farm.</p>
              <span className="bg-teal-600/20 text-teal-400 text-xs px-2 py-1 rounded">Jobs</span>
              <span className="ml-2 text-silver-100 text-xs">Negotiable</span>
            </div>
          </div>
        </Link>
        {/* Classified Card 4 */}
        <Link href="/classifieds/4" className="group block bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V9a2 2 0 00-2 2m2 2h6"></path></svg>
            </div>
            <div>
              <h3 className="font-semibold font-manrope mb-2">Live Fish Transport Trucks</h3>
              <p className="text-silver-100 text-sm mb-2">Two refrigerated trucks for live fish transport. Well maintained.</p>
              <span className="bg-teal-600/20 text-teal-400 text-xs px-2 py-1 rounded">Vehicles</span>
              <span className="ml-2 text-silver-100 text-xs">€15,000 each</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}