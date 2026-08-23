import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import "./ProtectedRoute.css";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="protected-route__loading">
        <span>Checking session...</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
