import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import {
  Download,
  Search,
  CheckCircle,
  Clock,
  Users,
  DollarSign,
  TrendingUp,
  Briefcase,
  ShoppingBag,
  MoreHorizontal,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { clsx } from "clsx";

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({
    revenue: 0,
    users: 0,
    activeOrders: 0,
    pendingApps: 0,
  });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // 1. Fetch Applications
      const appsQuery = query(
        collection(db, "applications"),
        orderBy("appliedAt", "desc")
      );
      const appsSnap = await getDocs(appsQuery);
      const appsData = appsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // 2. Fetch Orders (For Revenue & Active Count)
      const ordersSnap = await getDocs(collection(db, "orders"));
      let totalRev = 0;
      let activeOrd = 0;
      ordersSnap.forEach((doc) => {
        const data = doc.data();
        totalRev += Number(data.total || 0);
        if (["preparing", "ready", "delivering"].includes(data.status)) {
          activeOrd += 1;
        }
      });

      // 3. Fetch Users (Count)
      const usersSnap = await getDocs(collection(db, "users"));

      setApplications(appsData);
      setStats({
        revenue: totalRev,
        users: usersSnap.size,
        activeOrders: activeOrd,
        pendingApps: appsData.filter((a) => a.status === "new").length,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await updateDoc(doc(db, "applications", appId), {
        status: newStatus,
      });

      // Update local state optimistic UI
      setApplications((prev) =>
        prev.map((app) =>
          app.id === appId ? { ...app, status: newStatus } : app
        )
      );
      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
    }
  };

  const MetricCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-extrabold text-gray-900">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon size={20} className="text-white" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center text-xs text-green-600 font-bold">
          <TrendingUp size={14} className="mr-1" />
          {trend} this week
        </div>
      )}
    </div>
  );

  const StatusBadge = ({ status }) => {
    const styles = {
      new: "bg-blue-100 text-blue-700 border-blue-200",
      interview: "bg-orange-100 text-orange-700 border-orange-200",
      hired: "bg-green-100 text-green-700 border-green-200",
      rejected: "bg-red-100 text-red-700 border-red-200",
    };
    return (
      <span
        className={clsx(
          "px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide border",
          styles[status] || "bg-gray-100 text-gray-700"
        )}
      >
        {status}
      </span>
    );
  };

  const filteredApps = applications.filter((app) =>
    filter === "all" ? true : app.status === filter
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-8 pt-24">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Admin Command Center
          </h1>
          <p className="text-gray-500 mt-2">
            Overview of your platform's performance and hiring.
          </p>
        </div>

        {/* METRICS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <MetricCard
            title="Total Revenue"
            value={`₦${stats.revenue.toLocaleString()}`}
            icon={DollarSign}
            color="bg-green-500"
            trend="+12%"
          />
          <MetricCard
            title="Total Users"
            value={stats.users}
            icon={Users}
            color="bg-blue-500"
            trend="+5%"
          />
          <MetricCard
            title="Active Orders"
            value={stats.activeOrders}
            icon={ShoppingBag}
            color="bg-[#FF5200]"
          />
          <MetricCard
            title="Pending Applications"
            value={stats.pendingApps}
            icon={Briefcase}
            color="bg-purple-500"
          />
        </div>

        {/* CONTENT TABS */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="font-bold text-gray-800 flex items-center gap-2">
              <Briefcase size={18} className="text-gray-400" />
              Recent Applications
            </h2>
            <div className="flex gap-2">
              {["all", "new", "interview", "hired", "rejected"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all capitalize",
                    filter === f
                      ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                      : "text-gray-500 hover:text-gray-900"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Candidate
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Applied
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-50">
                {loading ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      Loading data...
                    </td>
                  </tr>
                ) : filteredApps.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No applications found.
                    </td>
                  </tr>
                ) : (
                  filteredApps.map((app) => (
                    <tr
                      key={app.id}
                      className="hover:bg-gray-50/80 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-500 font-bold text-sm">
                            {app.firstName.charAt(0)}
                            {app.lastName.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-bold text-gray-900">
                              {app.firstName} {app.lastName}
                            </div>
                            <div className="text-xs text-gray-500">
                              {app.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600 font-medium">
                          {app.jobTitle}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock size={14} className="mr-1.5" />
                          {new Date(app.appliedAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={app.status || "new"} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <select
                          className="bg-white border border-gray-200 text-xs font-bold text-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#FF5200] cursor-pointer"
                          value={app.status || "new"}
                          onChange={(e) =>
                            handleStatusChange(app.id, e.target.value)
                          }
                        >
                          <option value="new">New</option>
                          <option value="interview">Interview</option>
                          <option value="hired">Hired</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
