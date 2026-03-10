import { Building2 } from "lucide-react";
import { Link } from "react-router";

export default function Navbar() {
  return (
    <div className="navbar bg-base-200 shadow-md px-6">
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
          <Building2 size={26} />
          Token Queue System
        </Link>
      </div>
      <div className="flex-none gap-2">
        <Link to="/" className="btn btn-ghost btn-sm">
          Home
        </Link>
        <Link to="/create" className="btn btn-primary btn-sm">
          + New Token
        </Link>
      </div>
    </div>
  );
}
