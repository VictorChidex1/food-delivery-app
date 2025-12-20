import React, { useState, useEffect } from "react";
import { User, Lock, Bell, Save, Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Settings = () => {
  const { currentUser, deleteAccount, logout, updateUserDocument } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    notifications: true,
    marketingEmails: false,
  });

  // LOAD REAL USER DATA ON MOUNT
  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        fullName: currentUser.displayName || currentUser.fullName || "",
        email: currentUser.email || "",
      }));
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSave = async (section) => {
    if (section === "Personal") {
      try {
        await updateUserDocument(currentUser.uid, {
          fullName: formData.fullName,
          phone: formData.phone,
        });
        toast.success("Personal information updated successfully!");
      } catch (error) {
        toast.error("Failed to update profile.");
        console.error(error);
      }
    } else {
      toast.success(`${section} settings saved successfully!`);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to permanently delete your account? This action cannot be undone."
      )
    ) {
      try {
        await deleteAccount();
        toast.success("Account deleted successfully.");
        navigate("/");
      } catch (error) {
        if (error.code === "auth/requires-recent-login") {
          toast.error(
            "Security: Please log out and log in again to verify your identity before deleting."
          );
        } else {
          toast.error("Failed to delete account. Please try again.");
          console.error(error);
        }
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 pb-20">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
        Account Settings
      </h1>

      {/* 1. PERSONAL INFORMATION */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="bg-orange-100 p-2 rounded-full text-orange-600">
            <User size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              Personal Information
            </h2>
            <p className="text-sm text-gray-500">
              Update your personal details here.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              // Optional: Add 'disabled' if you don't want users changing emails easily
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="+234..."
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => handleSave("Personal")}
            className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>

      {/* 2. SECURITY */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="bg-orange-100 p-2 rounded-full text-orange-600">
            <Lock size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              Security & Password
            </h2>
            <p className="text-sm text-gray-500">
              Ensure your account is secure with a strong password.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              placeholder="••••••••"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              placeholder="••••••••"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => handleSave("Security")}
            className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <Save size={18} />
            Update Password
          </button>
        </div>
      </div>

      {/* 3. PREFERENCES & DANGER ZONE */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Notifications */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-100 p-2 rounded-full text-orange-600">
              <Bell size={24} />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Order Updates</span>
              <input
                type="checkbox"
                name="notifications"
                checked={formData.notifications}
                onChange={handleChange}
                className="w-5 h-5 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Marketing Emails</span>
              <input
                type="checkbox"
                name="marketingEmails"
                checked={formData.marketingEmails}
                onChange={handleChange}
                className="w-5 h-5 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 rounded-2xl border border-red-100 p-6">
          <h2 className="text-lg font-bold text-red-700 mb-2">Danger Zone</h2>
          <p className="text-sm text-red-600/80 mb-6">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <button
            onClick={handleDeleteAccount}
            className="w-full bg-white border border-red-200 text-red-600 px-4 py-2.5 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 size={18} />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
