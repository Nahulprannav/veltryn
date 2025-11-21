import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { SpotlightCard } from './shared/SpotlightCard';
import blogsData from '../data/blogs.json';

export function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const blogPosts = blogsData;

  const categories = ['All', 'Programming', 'Web Development', 'Security', 'Cloud', 'AI/ML', 'Database', 'DevOps'];

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl mb-4">Blog</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Stay updated with the latest insights, tutorials, and industry trends from our expert team.
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full border transition-colors ${
              selectedCategory === category
                ? 'border-blue-600 dark:border-yellow-600 bg-blue-50 dark:bg-gray-800'
                : 'border-gray-200 dark:border-gray-800 hover:border-blue-600 dark:hover:border-yellow-600 hover:bg-blue-50 dark:hover:bg-gray-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <div className="mb-12">
          <SpotlightCard>
            <Link to={`/blog/${filteredPosts[0].id}`} className="block">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto">
                  <img
                    src={filteredPosts[0].image}
                    alt={filteredPosts[0].title}
                    className="absolute inset-0 w-full h-full object-cover rounded-l-xl"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-yellow-900/20 text-blue-600 dark:text-yellow-600 text-xs">
                      Featured
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{filteredPosts[0].category}</span>
                  </div>
                  <h2 className="text-3xl mb-4">{filteredPosts[0].title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{filteredPosts[0].excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{filteredPosts[0].author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{filteredPosts[0].date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-blue-600 dark:text-yellow-600 hover:gap-3 transition-all">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </SpotlightCard>
        </div>
      )}

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.slice(1).map((post) => (
          <SpotlightCard key={post.id}>
            <Link to={`/blog/${post.id}`} className="block h-full">
              <div className="flex flex-col h-full">
                <div className="relative h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover rounded-t-xl"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl mb-2">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-1">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-blue-600 dark:text-yellow-600 hover:gap-3 transition-all">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </SpotlightCard>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">No blogs found in this category.</p>
        </div>
      )}
    </div>
  );
}