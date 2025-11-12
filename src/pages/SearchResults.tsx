import { useState, useEffect, FormEvent } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(query);
  const navigate = useNavigate();

  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const kidsKeywords = [
    "kids", "children", "family", "young readers", "story for kids",
    "ebooks for kids", "audiobooks for kids", "family friendly", "educational"
  ];

  const booktokKeywords = [
    "booktok", "top books", "best books", "trending books", "viral books",
    "influencer books", "popular books 2025", "must read", "bestsellers 2025", "tiktok books"
  ];

  const comparisonKeywords = [
    "nextory", "storytel", "vs", "versus", "compare", "comparison",
    "alternative", "best audiobook app", "which is better"
  ];

  const isKidsRelated = kidsKeywords.some(keyword => 
    query.toLowerCase().includes(keyword.toLowerCase())
  );

  const isBooktokRelated = booktokKeywords.some(keyword => 
    query.toLowerCase().includes(keyword.toLowerCase())
  );

  const isComparisonRelated = comparisonKeywords.some(keyword => 
    query.toLowerCase().includes(keyword.toLowerCase())
  );

  const hasResults = isKidsRelated || isBooktokRelated || isComparisonRelated;

  const mockResults = [
    {
      title: "Kids Reading Resources - Educational Platform",
      url: "readingresources.com",
      description: "Comprehensive reading resources for children of all ages. Find books, activities, and educational materials."
    },
    {
      title: "Children's Literature Database",
      url: "childrenliterature.org",
      description: "Explore thousands of children's books, reviews, and recommendations from educators and parents."
    },
    {
      title: "Family Reading Time - Tips & Guides",
      url: "familyreading.net",
      description: "Make reading time special with your family. Tips, book lists, and activities for all ages."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Search Bar */}
      <header className="sticky top-0 bg-white border-b border-border py-4 px-4 md:px-8">
        <div className="max-w-4xl flex items-center gap-6">
          <Link to="/" className="text-3xl font-bold flex-shrink-0">
            <span className="text-blue-600">F</span>
            <span className="text-red-600">o</span>
            <span className="text-yellow-500">o</span>
            <span className="text-blue-600">b</span>
            <span className="text-green-600">l</span>
            <span className="text-red-600">e</span>
          </Link>
          
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-4 h-10 rounded-full border-2 border-gray-300 hover:border-gray-400 focus-visible:border-blue-500"
              />
            </div>
          </form>
        </div>
      </header>

      {/* Results */}
      <main className="max-w-4xl mx-auto px-4 md:px-8 py-6">
        <p className="text-sm text-gray-600 mb-6">
          About {hasResults ? "15,400" : "0"} results (0.42 seconds)
        </p>

        {hasResults ? (
          <>
            {/* Sponsored Ad - Kids */}
            {isKidsRelated && (
              <div className="mb-6 p-4 border-l-4 border-blue-600 bg-blue-50 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold px-2 py-0.5 bg-white border border-gray-300 rounded">Ad</span>
                </div>
                <Link to="/kids" className="block hover:underline">
                  <h3 className="text-xl text-blue-700 font-medium mb-1">
                    Nextory Kids - Unlimited Audiobooks & E-books for Children
                  </h3>
                  <p className="text-sm text-green-700 mb-2">www.nextory.com/kids</p>
                  <p className="text-sm text-gray-700">
                    Safe, age-appropriate content for young readers. Thousands of children's audiobooks and e-books. Educational and entertaining stories your kids will love. Try free for 30 days.
                  </p>
                </Link>
              </div>
            )}

            {/* Sponsored Ad - BookTok */}
            {isBooktokRelated && (
              <div className="mb-6 p-4 border-l-4 border-blue-600 bg-blue-50 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold px-2 py-0.5 bg-white border border-gray-300 rounded">Ad</span>
                </div>
                <Link to="/booktok" className="block hover:underline">
                  <h3 className="text-xl text-blue-700 font-medium mb-1">
                    Most Popular BookTok Audiobooks of 2025 - Listen Now on Nextory
                  </h3>
                  <p className="text-sm text-green-700 mb-2">www.nextory.com/booktok</p>
                  <p className="text-sm text-gray-700">
                    Stream all the viral BookTok favorites everyone is talking about. From Fourth Wing to Divine Rivals - unlimited access to trending titles. Start your free trial today.
                  </p>
                </Link>
              </div>
            )}

            {/* Sponsored Ad - Comparison */}
            {isComparisonRelated && (
              <div className="mb-6 p-4 border-l-4 border-blue-600 bg-blue-50 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold px-2 py-0.5 bg-white border border-gray-300 rounded">Ad</span>
                </div>
                <Link to="/comparison" className="block hover:underline">
                  <h3 className="text-xl text-blue-700 font-medium mb-1">
                    Nextory vs Storytel - Compare Features & Pricing 2025
                  </h3>
                  <p className="text-sm text-green-700 mb-2">www.nextory.com/comparison</p>
                  <p className="text-sm text-gray-700">
                    See how Nextory stacks up against Storytel. Compare catalog size, pricing, features, and user experience. Find the best audiobook service for you.
                  </p>
                </Link>
              </div>
            )}

            {/* Mock Search Results */}
            {mockResults.map((result, index) => (
              <div key={index} className="mb-6">
                <div className="text-sm text-gray-600 mb-1">{result.url}</div>
                <h3 className="text-xl text-blue-700 hover:underline cursor-pointer mb-1">
                  {result.title}
                </h3>
                <p className="text-sm text-gray-700">{result.description}</p>
              </div>
            ))}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-700 mb-2">
              No results found for <strong>"{query}"</strong>
            </p>
            <p className="text-sm text-gray-600">
              Try different keywords or check your spelling
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchResults;
