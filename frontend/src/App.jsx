import { Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import TimeSuggestPage from "./pages/TimeSuggestPage";

export default function App() {
  return (
    <div className="min-h-screen bg-base-100">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "oklch(var(--b2))",
            color: "oklch(var(--bc))",
            border: "1px solid oklch(var(--b3))",
          },
        }}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/time-suggest" element={<TimeSuggestPage />} />
      </Routes>
    </div>
  );
}
