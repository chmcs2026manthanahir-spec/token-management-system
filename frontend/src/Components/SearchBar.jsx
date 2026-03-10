import { Search } from "lucide-react";

export default function SearchBar({ search, setSearch }) {
  return (
    <div className="relative mb-6">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content opacity-50"
        size={18}
      />
      <input
        type="text"
        placeholder="Search by Token / Name / Service / Status..."
        className="input input-bordered w-full pl-10"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
