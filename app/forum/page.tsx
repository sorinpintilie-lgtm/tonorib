import Link from 'next/link';

export default function Forum() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold font-manrope mb-6">Forum</h1>
      <p className="text-silver-100 mb-4">
        Welcome to the TonoRib Forum! Connect with other fish farmers, sellers, and buyers to discuss
        best practices, market trends, and industry news.
      </p>
      <div className="bg-white/5 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold font-manrope mb-4">Popular Discussions</h2>
        <div className="space-y-4">
          <Link href="/forum/topic/1" className="block p-4 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
            <h3 className="font-semibold mb-2">Sustainable Fish Farming Techniques</h3>
            <p className="text-silver-100 text-sm">Discussing eco-friendly practices in aquaculture.</p>
          </Link>
          <Link href="/forum/topic/2" className="block p-4 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
            <h3 className="font-semibold mb-2">Market Prices for Sea Bass and Sea Bream</h3>
            <p className="text-silver-100 text-sm">Current market trends and pricing strategies.</p>
          </Link>
          <Link href="/forum/topic/3" className="block p-4 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
            <h3 className="font-semibold mb-2">New Regulations for Fish Imports</h3>
            <p className="text-silver-100 text-sm">Understanding the latest EU regulations affecting our industry.</p>
          </Link>
        </div>
      </div>
      <div className="bg-white/5 rounded-lg p-6">
        <h2 className="text-xl font-semibold font-manrope mb-4">Start a New Discussion</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-silver-100 mb-2 font-medium">Topic Title</label>
            <input type="text" required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-silver-400 focus:outline-none focus:ring-2 focus:ring-teal-400" placeholder="Enter your topic title" />
          </div>
          <div>
            <label className="block text-silver-100 mb-2 font-medium">Category</label>
            <select required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-silver-400 focus:outline-none focus:ring-2 focus:ring-teal-400">
              <option value="">Select a category</option>
              <option value="farming">Fish Farming</option>
              <option value="market">Market & Sales</option>
              <option value="regulations">Regulations & Compliance</option>
              <option value="technology">Technology & Equipment</option>
              <option value="general">General Discussion</option>
            </select>
          </div>
          <div>
            <label className="block text-silver-100 mb-2 font-medium">Message</label>
            <textarea required rows="5" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-silver-400 focus:outline-none focus:ring-2 focus:ring-teal-400" placeholder="Write your message here..."></textarea>
          </div>
          <button type="submit" className="w-fit px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors">
            Post Discussion
          </button>
        </form>
      </div>
    </div>
  );
}