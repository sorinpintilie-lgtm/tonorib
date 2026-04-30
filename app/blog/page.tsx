import Link from 'next/link';

export default function Blog() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold font-manrope mb-6">Blog</h1>
      <p className="text-silver-100 mb-8">
        Stay updated with the latest news, tips, and insights from the fish farming industry.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Blog Post 1 */}
        <Link href="/blog/post/1" className="group block bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors">
          <div className="aspect-w-4 aspect-h-3 bg-gray-200">
            <svg className="h-full w-full text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></svg>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold font-manrope mb-2">Sustainable Practices in Modern Aquaculture</h3>
            <p className="text-silver-100 text-sm mb-4">
              Learn how modern fish farms are implementing eco-friendly techniques to reduce environmental impact while maintaining productivity.
            </p>
            <div className="flex items-center text-xs">
              <span className="mr-3">Apr 15, 2026</span>
              <span className="bg-teal-600/20 text-teal-400 px-2 py-1 rounded">Sustainability</span>
            </div>
          </div>
        </Link>
        {/* Blog Post 2 */}
        <Link href="/blog/post/2" className="group block bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors">
          <div className="aspect-w-4 aspect-h-3 bg-gray-200">
            <svg className="h-full w-full text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m2 0a9 9 0 11-18 0 9 9 0 0118 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold font-manrope mb-2">Market Analysis: Sea Bass Prices Q1 2026</h3>
            <p className="text-silver-100 text-sm mb-4">
              Detailed analysis of sea bass pricing trends across European markets and predictions for the coming quarters.
            </p>
            <div className="flex items-center text-xs">
              <span className="mr-3">Apr 10, 2026</span>
              <span className="bg-teal-600/20 text-teal-400 px-2 py-1 rounded">Market</span>
            </div>
          </div>
        </Link>
        {/* Blog Post 3 */}
        <Link href="/blog/post/3" className="group block bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors">
          <div className="aspect-w-4 aspect-h-3 bg-gray-200">
            <svg className="h-full w-full text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2z"></path></svg>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold font-manrope mb-2">Technology Update: IoT in Fish Farming</h3>
            <p className="text-silver-100 text-sm mb-4">
              How Internet of Things devices are revolutionizing monitoring and management in aquaculture operations.
            </p>
            <div className="flex items-center text-xs">
              <span className="mr-3">Apr 5, 2026</span>
              <span className="bg-teal-600/20 text-teal-400 px-2 py-1 rounded">Technology</span>
            </div>
          </div>
        </Link>
        {/* Blog Post 4 */}
        <Link href="/blog/post/4" className="group block bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors">
          <div className="aspect-w-4 aspect-h-3 bg-gray-200">
            <svg className="h-full w-full text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold font-manrope mb-2">Recipe Spotlight: Grilled Sea Bream with Mediterranean Herbs</h3>
            <p className="text-silver-100 text-sm mb-4">
              A delicious and healthy recipe featuring freshly caught sea bream, perfect for spring and summer dining.
            </p>
            <div className="flex items-center text-xs">
              <span className="mr-3">Apr 1, 2026</span>
              <span className="bg-teal-600/20 text-teal-400 px-2 py-1 rounded">Recipe</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}