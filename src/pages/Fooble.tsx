import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Fooble = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-2xl space-y-8">
        <h1 className="text-6xl md:text-8xl font-bold text-center mb-8">
          <span className="text-blue-600">F</span>
          <span className="text-red-600">o</span>
          <span className="text-yellow-500">o</span>
          <span className="text-blue-600">b</span>
          <span className="text-green-600">l</span>
          <span className="text-red-600">e</span>
        </h1>

        <form onSubmit={handleSearch} className="w-full">
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-gray-500" />
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Fooble..."
              className="w-full pl-12 pr-4 h-12 text-lg rounded-full border-2 border-gray-300 hover:border-gray-400 focus-visible:border-blue-500 transition-colors"
            />
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <Button type="submit" className="bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300" size="lg">
              Fooble Search
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Fooble;
