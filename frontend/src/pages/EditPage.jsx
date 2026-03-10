import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import TokenForm from "../Components/TokenForm";

export default function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tokenNumber: "",
    customerName: "",
    serviceType: "",
    priorityLevel: "Normal",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await axiosInstance.get(`/tokens/${id}`);
        setFormData({
          tokenNumber: res.data.tokenNumber,
          customerName: res.data.customerName,
          serviceType: res.data.serviceType,
          priorityLevel: res.data.priorityLevel,
        });
      } catch (err) {
        toast.error("Failed to load token.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchToken();
  }, [id, navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Updating token...");
    try {
      await axiosInstance.put(`/tokens/${id}`, formData);
      toast.success("Token updated successfully! ✅", { id: toastId });
      navigate("/");
    } catch (err) {
      toast.error("Failed to update token.", { id: toastId });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-primary mb-6">Edit Token</h1>
      <TokenForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isEdit={true}
      />
    </div>
  );
}
