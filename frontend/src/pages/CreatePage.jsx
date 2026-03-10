import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import TokenForm from "../components/TokenForm";

export default function CreatePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tokenNumber: "",
    customerName: "",
    serviceType: "",
    priorityLevel: "Normal",
  });

  // Auto fetch next token number
  useEffect(() => {
    const fetchNextToken = async () => {
      try {
        const res = await axiosInstance.get("/tokens");
        const tokens = Array.isArray(res.data) ? res.data : [];
        const maxToken = tokens.length > 0
          ? Math.max(...tokens.map((t) => t.tokenNumber))
          : 0;
        setFormData((prev) => ({ ...prev, tokenNumber: maxToken + 1 }));
      } catch (err) {
        setFormData((prev) => ({ ...prev, tokenNumber: 1 }));
      }
    };
    fetchNextToken();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Generating token...");
    try {
      await axiosInstance.post("/tokens", formData);
      toast.success("Token generated successfully! ✅", { id: toastId });
      navigate("/");
    } catch (err) {
      toast.error("Failed to create token. Please check backend.", { id: toastId });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-primary mb-6">Generate New Token</h1>
      <TokenForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isEdit={false}
      />
    </div>
  );
}
