import { Plus, Hash, User, Briefcase, AlertCircle } from "lucide-react";

export default function TokenForm({ formData, handleChange, handleSubmit, isEdit = false }) {
  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-secondary mb-4">
          <Plus size={20} />
          {isEdit ? "Update Token" : "Generate New Token"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Token Number - readonly, auto assigned */}
          <label className="input input-bordered flex items-center gap-2 opacity-60">
            <Hash size={16} className="opacity-50" />
            <input
              name="tokenNumber"
              type="number"
              placeholder="Token No (Auto)"
              className="grow"
              value={formData.tokenNumber}
              onChange={handleChange}
              readOnly={!isEdit}
              required
            />
          </label>

          {/* Customer Name */}
          <label className="input input-bordered flex items-center gap-2">
            <User size={16} className="opacity-50" />
            <input
              name="customerName"
              placeholder="Customer Name"
              className="grow"
              value={formData.customerName}
              onChange={handleChange}
              required
            />
          </label>

          {/* Service Type */}
          <label className="input input-bordered flex items-center gap-2">
            <Briefcase size={16} className="opacity-50" />
            <input
              name="serviceType"
              placeholder="Service Type"
              className="grow"
              value={formData.serviceType}
              onChange={handleChange}
              required
            />
          </label>

          {/* Priority Level */}
          <label className="select select-bordered flex items-center gap-2">
            <AlertCircle size={16} className="opacity-50 shrink-0" />
            <select
              name="priorityLevel"
              className="grow bg-transparent outline-none"
              value={formData.priorityLevel}
              onChange={handleChange}
            >
              <option>Normal</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </label>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button type="submit" className="btn btn-primary w-full gap-2">
              <Plus size={18} />
              {isEdit ? "Update Token" : "Generate Token"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}