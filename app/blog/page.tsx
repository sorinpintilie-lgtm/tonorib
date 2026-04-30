import Link from 'next/link';

const posts = [
  {
    id: 1,
    title: 'Sustainable Practices in Modern Aquaculture',
    excerpt:
      'Learn how modern fish farms are implementing eco-friendly techniques to reduce environmental impact while maintaining productivity.',
    date: 'Apr 15, 2026',
    category: 'Sustainability',
    icon: (
      <svg className="h-full w-full text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Market Analysis: Sea Bass Prices Q1 2026',
    excerpt:
      'Detailed analysis of sea bass pricing trends across European markets and predictions for the coming quarters.',
    date: 'Apr 10, 2026',
    category: 'Market',
    icon: (
      <svg className="h-full w-full text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m2 0a9 9 0 11-18 0 9 9 0 0118 0" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Technology Update: IoT in Fish Farming',
    excerpt:
      'How Internet of Things devices are revolutionizing monitoring and management in aquaculture operations.',
    date: 'Apr 5, 2026',
    category: 'Technology',
    icon: (
      <svg className="h-full w-full text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Recipe Spotlight: Grilled Sea Bream with Mediterranean Herbs',
    excerpt:
      'A delicious and healthy recipe featuring freshly caught sea bream, perfect for spring and summer dining.',
    date: 'Apr 1, 2026',
    category: 'Recipe',
    icon: (
      <svg className="h-full w-full text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function Blog() {
  return (
    <div className="bg-ice min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold font-manrope text-slate mb-4">Blog</h1>
          <p className="text-slate-600 max-w-3xl">
            Stay updated with the latest news, tips, and insights from the fish farming industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/post/${post.id}`}
              className="group block bg-white rounded-lg overflow-hidden border border-silver/60 shadow-sm hover:shadow-md transition-all"
            >
              <div className="aspect-w-4 aspect-h-3 bg-gray-200">{post.icon}</div>
              <div className="p-6">
                <h3 className="text-xl font-semibold font-manrope text-slate mb-2">{post.title}</h3>
                <p className="text-slate-600 text-sm mb-4">{post.excerpt}</p>
                <div className="flex items-center text-xs text-slate-500">
                  <span className="mr-3">{post.date}</span>
                  <span className="bg-teal-50 text-teal px-2 py-1 rounded">{post.category}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
