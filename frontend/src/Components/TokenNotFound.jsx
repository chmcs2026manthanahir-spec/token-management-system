import { SearchX } from "lucide-react";
import { Link } from "react-router";

export default function TokenNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <SearchX size={64} className="text-base-content opacity-30" />
      <h2 className="text-2xl font-bold opacity-50">No Tokens Found</h2>
      <p className="text-base-content opacity-40 text-sm">
        No tokens match your search criteria.
      </p>
      <Link to="/create" className="btn btn-primary btn-sm mt-2">
        + Create New Token
      </Link>
    </div>
  );
}
