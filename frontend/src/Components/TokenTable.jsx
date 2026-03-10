import { Trash2, Calendar, Clock } from "lucide-react";

export default function TokenTable({ tokens, handleDelete }) {
  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body overflow-x-auto p-0">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Token</th>
              <th>Customer</th>
              <th>Service</th>
              <th>Status</th>
              <th>Priority</th>
              <th>
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> Date
                </span>
              </th>
              <th>
                <span className="flex items-center gap-1">
                  <Clock size={14} /> Time
                </span>
              </th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {tokens.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center opacity-60 py-8">
                  No tokens found
                </td>
              </tr>
            ) : (
              tokens.map((t) => (
                <tr key={t._id}>
                  <td className="font-bold text-primary">#{t.tokenNumber}</td>
                  <td>{t.customerName}</td>
                  <td>{t.serviceType}</td>

                  <td>
                    <span
                      className={`badge ${
                        t.status === "Completed"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        t.priorityLevel === "Urgent"
                          ? "badge-error"
                          : t.priorityLevel === "High"
                          ? "badge-warning"
                          : "badge-info"
                      }`}
                    >
                      {t.priorityLevel}
                    </span>
                  </td>

                  <td>{new Date(t.issuedAt).toLocaleDateString()}</td>
                  <td>{new Date(t.issuedAt).toLocaleTimeString()}</td>

                  <td>
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="btn btn-xs btn-error gap-1"
                    >
                      <Trash2 size={12} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
