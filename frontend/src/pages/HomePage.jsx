import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RefreshCw, AlertTriangle } from "lucide-react";
import axiosInstance from "../lib/axios";
import TokenCard from "../Components/TokenCard";
import TokenNotFound from "../Components/TokenNotFound";
import SearchBar from "../Components/SearchBar";

export default function HomePage() {
  const [tokens, setTokens] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTokens = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axiosInstance.get("/tokens");
      setTokens(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch tokens:", err);
      setError("Unable to connect to backend. Please start the backend server (port 3001).");
      setTokens([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  const handleDelete = async (id) => {
    const toastId = toast.loading("Deleting token...");
    try {
      await axiosInstance.delete(`/tokens/${id}`);
      await fetchTokens();
      toast.success("Token deleted successfully!", { id: toastId });
    } catch (err) {
      toast.error("Failed to delete token.", { id: toastId });
    }
  };

  const handleComplete = async (id) => {
    const toastId = toast.loading("Marking as completed...");
    try {
      await axiosInstance.put(`/tokens/${id}`, { status: "Completed" });
      await fetchTokens();
      toast.success("Token marked as completed! ✅", { id: toastId });
    } catch (err) {
      toast.error("Failed to update token status.", { id: toastId });
    }
  };

  const filteredTokens = tokens.filter(
    (t) =>
      String(t.tokenNumber).includes(search) ||
      (t.customerName && t.customerName.toLowerCase().includes(search.toLowerCase())) ||
      (t.serviceType && t.serviceType.toLowerCase().includes(search.toLowerCase())) ||
      (t.status && t.status.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* Error Banner */}
      {error && (
        <div className="alert alert-error mb-6">
          <AlertTriangle size={20} className="stroke-current shrink-0" />
          <span>{error}</span>
          <button onClick={fetchTokens} className="btn btn-sm btn-ghost gap-1">
            <RefreshCw size={14} /> Retry
          </button>
        </div>
      )}

      {/* Stats Bar */}
      <div className="stats shadow mb-6 w-full">
        <div className="stat">
          <div className="stat-title">Total Tokens</div>
          <div className="stat-value text-primary">{tokens.length}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Pending</div>
          <div className="stat-value text-warning">
            {tokens.filter((t) => t.status !== "Completed").length}
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Completed</div>
          <div className="stat-value text-success">
            {tokens.filter((t) => t.status === "Completed").length}
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Urgent</div>
          <div className="stat-value text-error">
            {tokens.filter((t) => t.priorityLevel === "Urgent").length}
          </div>
        </div>
      </div>

      {/* Search */}
      <SearchBar search={search} setSearch={setSearch} />

      {/* Token Cards */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-base-content opacity-60">Loading tokens...</p>
        </div>
      ) : filteredTokens.length === 0 ? (
        <TokenNotFound />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTokens.map((token) => (
            <TokenCard
              key={token._id}
              token={token}
              onDelete={handleDelete}
              onComplete={handleComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
}