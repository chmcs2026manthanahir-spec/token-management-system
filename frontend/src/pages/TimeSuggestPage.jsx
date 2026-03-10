import { useState } from "react";
import { Clock, AlertCircle } from "lucide-react";

const SERVICE_TIMES = {
  "Account Opening": 20,
  "Loan Inquiry": 30,
  "Cash Deposit": 5,
  "Cash Withdrawal": 5,
  "Cheque Deposit": 10,
  "DD / Banker's Cheque": 15,
  "KYC Update": 15,
  "Card Issue": 10,
  "Other": 10,
};

export default function TimeSuggestPage() {
  const [service, setService] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [suggested, setSuggested] = useState(null);

  const handleSuggest = () => {
    if (!service) return;
    let baseTime = SERVICE_TIMES[service] || 10;
    if (priority === "Urgent") baseTime = Math.ceil(baseTime * 0.5);
    else if (priority === "High") baseTime = Math.ceil(baseTime * 0.75);
    setSuggested(baseTime);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-primary mb-2">Wait Time Suggest</h1>
      <p className="text-base-content opacity-60 mb-6 text-sm">
        View estimated wait time based on service and priority.
      </p>

      <div className="card bg-base-200 shadow-xl">
        <div className="card-body gap-4">

          {/* Service Type */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Service Type</span>
            </div>
            <select
              className="select select-bordered w-full"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <option value="">-- Select a Service --</option>
              {Object.keys(SERVICE_TIMES).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>

          {/* Priority */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Priority Level</span>
            </div>
            <select
              className="select select-bordered w-full"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>Normal</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </label>

          <button
            onClick={handleSuggest}
            className="btn btn-primary gap-2 mt-2"
            disabled={!service}
          >
            <Clock size={18} />
            Calculate Wait Time
          </button>

          {/* Result */}
          {suggested !== null && (
            <div className="alert alert-info mt-2">
              <AlertCircle size={20} />
              <div>
                <p className="font-bold">Estimated Wait Time</p>
                <p className="text-2xl font-bold">{suggested} minutes</p>
                <p className="text-xs opacity-70">
                  Service: {service} | Priority: {priority}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
