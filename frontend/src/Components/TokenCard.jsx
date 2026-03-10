import { Trash2, Calendar, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router";

export default function TokenCard({ token, onDelete, onComplete }) {
  const navigate = useNavigate();
  const isCompleted = token.status === "Completed";

  return (
    <div className={`card shadow-md hover:shadow-xl transition-shadow ${isCompleted ? "bg-base-300 opacity-70" : "bg-base-200"}`}>
      <div className="card-body">
        <div className="flex justify-between items-start">
          <h2 className="card-title text-primary text-2xl">
            #{token.tokenNumber}
          </h2>
          <div className="flex gap-2">
            <span className={`badge ${isCompleted ? "badge-success" : "badge-warning"}`}>
              {token.status}
            </span>
            <span
              className={`badge ${token.priorityLevel === "Urgent"
                  ? "badge-error"
                  : token.priorityLevel === "High"
                    ? "badge-warning"
                    : "badge-info"
                }`}
            >
              {token.priorityLevel}
            </span>
          </div>
        </div>

        <p className="text-base-content font-medium">{token.customerName}</p>
        <p className="text-base-content opacity-60 text-sm">{token.serviceType}</p>

        <div className="flex items-center gap-4 text-xs opacity-50 mt-1">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {new Date(token.issuedAt).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {new Date(token.issuedAt).toLocaleTimeString()}
          </span>
        </div>

        <div className="card-actions justify-end mt-2 flex-wrap gap-1">
          {/* Mark as Complete - only show if not already completed */}
          {!isCompleted && (
            <button
              onClick={() => onComplete(token._id)}
              className="btn btn-xs btn-success gap-1"
            >
              <CheckCircle size={12} />
              Mark Complete
            </button>
          )}
          <button
            onClick={() => navigate(`/edit/${token._id}`)}
            className="btn btn-xs btn-outline btn-info"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(token._id)}
            className="btn btn-xs btn-error gap-1"
          >
            <Trash2 size={12} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}