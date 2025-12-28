import { Search, MapPin } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <MapPin className="h-5 w-5 text-primary" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your destination..."
          className="input-eco pl-12 pr-14 py-4 text-lg w-full"
        />
        <button
          type="submit"
          className="absolute inset-y-2 right-2 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 flex items-center gap-2"
        >
          <Search className="h-5 w-5" />
          <span className="hidden sm:inline font-medium">Search</span>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
