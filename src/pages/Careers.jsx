import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Heart,
  Zap,
  Globe,
  Coffee,
  ArrowRight,
  MapPin,
  Clock,
  X,
  Upload,
  CheckCircle,
  FileText,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import Footer from "../components/Footer";

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resume, setResume] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const benefits = [
    {
      icon: Globe,
      title: "Remote Friendly",
      desc: "Work from anywhere in Nigeria. We prioritize output over hours.",
    },
    {
      icon: Zap,
      title: "Fast Growth",
      desc: "Join a rocket ship. We are growing 20% month over month.",
    },
    {
      icon: Heart,
      title: "Health Insurance",
      desc: "Comprehensive HMO plans for you and your family.",
    },
    {
      icon: Coffee,
      title: "Free Lunch",
      desc: "Of course! We are a food company. Weekly food allowances.",
    },
  ];

  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Engineer",
      dept: "Engineering",
      loc: "Lagos / Remote",
      type: "Full-time",
    },
    {
      id: 2,
      title: "Backend Developer (Node.js)",
      dept: "Engineering",
      loc: "Remote",
      type: "Full-time",
    },
    {
      id: 3,
      title: "Product Designer UI/UX",
      dept: "Design",
      loc: "Lagos",
      type: "Full-time",
    },
    {
      id: 4,
      title: "Customer Success Lead",
      dept: "Operations",
      loc: "Abuja",
      type: "Full-time",
    },
    {
      id: 5,
      title: "Delivery Rider Partner",
      dept: "Logistics",
      loc: "Nationwide",
      type: "Contract",
    },
    {
      id: 6,
      title: "Social Media Manager",
      dept: "Marketing",
      loc: "Lagos / Remote",
      type: "Full-time",
    },
    {
      id: 7,
      title: "Data Analyst",
      dept: "Product",
      loc: "Remote",
      type: "Full-time",
    },
  ];

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setResume(null); // Reset file when opening new modal
  };

  const closeModal = () => {
    setSelectedJob(null);
    setResume(null);
  };

  // --- NEW: FILE HANDLERS ---
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) validateAndSetFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) validateAndSetFile(file);
  };

  const validateAndSetFile = (file) => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload PDF or Word documents.");
      return;
    }

    if (file.size > maxSize) {
      toast.error("File is too large. Max size is 5MB.");
      return;
    }

    setResume(file);
    toast.success("File attached successfully");
  };

  const removeFile = (e) => {
    e.stopPropagation(); // Prevent opening file dialog
    setResume(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  // ---------------------------

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!resume) {
      toast.error("Please upload your CV to continue.");
      return;
    }

    setIsSubmitting(true);

    // Simulate Network Request
    setTimeout(() => {
      setIsSubmitting(false);
      setSelectedJob(null);
      setResume(null);
      toast.success("Application Sent! We'll be in touch soon. 🚀");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pt-20 flex flex-col">
      {/* HERO SECTION */}
      <section className="relative bg-gray-900 text-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />

        <div className="relative max-w-4xl mx-auto text-center z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#FF5200] font-bold tracking-wider uppercase text-sm mb-4 block"
          >
            Join the Revolution
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
          >
            Build the Future of <br />{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5200] to-orange-400">
              Food Delivery
            </span>{" "}
            in Africa.
          </motion.h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              document
                .getElementById("openings")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="bg-[#FF5200] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30"
          >
            View Open Positions
          </motion.button>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              Why work at FoodFlow?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              We prioritize our people just as much as our customers. Here is
              what you can expect.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF5200] mb-6">
                  <benefit.icon size={24} />
                </div>
                <h3 className="font-bold text-xl mb-3">{benefit.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN POSITIONS */}
      <section id="openings" className="py-20 px-6 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-10 gap-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Current Openings
            </h2>
            <span className="bg-green-100 text-green-700 px-2.5 py-1 md:px-3 rounded-full text-[10px] md:text-xs font-bold border border-green-200 whitespace-nowrap shrink-0">
              {jobs.length} Roles Available
            </span>
          </div>

          <div className="space-y-4">
            {jobs.map((job) => (
              <motion.div
                key={job.id}
                whileHover={{ scale: 1.01 }}
                className="group bg-white border border-gray-200 p-6 rounded-xl hover:border-[#FF5200] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
              >
                <div>
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#FF5200] transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                    <span className="flex items-center gap-1">
                      <Briefcase size={14} /> {job.dept}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} /> {job.loc}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {job.type}
                    </span>
                  </div>
                </div>
                <div className="shrink-0">
                  <button
                    onClick={() => handleApplyClick(job)}
                    className="px-6 py-2 rounded-lg border border-gray-200 font-bold text-sm hover:bg-[#FF5200] hover:text-white hover:border-[#FF5200] transition-all w-full md:w-auto"
                  >
                    Apply Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Box */}
          <div className="mt-12 bg-gray-900 text-white rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Don't see the right role?
            </h3>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              We are always looking for talented people. Send your CV to our
              talent team.
            </p>
            <a
              href="mailto:careers@foodflow.com"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Email Talent Team <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* APPLICATION MODAL */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">
                    Apply for Role
                  </h3>
                  <p className="text-sm text-[#FF5200] font-bold">
                    {selectedJob.title}
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar">
                <form
                  id="application-form"
                  onSubmit={handleFormSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">
                        First Name
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Victor"
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#FF5200] transition-colors text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">
                        Last Name
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Chidera"
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#FF5200] transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="you@example.com"
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#FF5200] transition-colors text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">
                      Portfolio / LinkedIn URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://..."
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#FF5200] transition-colors text-sm"
                    />
                  </div>

                  {/* --- DYNAMIC DRAG & DROP UPLOAD --- */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">
                      Resume / CV <span className="text-red-500">*</span>
                    </label>

                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all group ${
                        isDragging
                          ? "border-[#FF5200] bg-orange-50"
                          : resume
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-[#FF5200] hover:bg-orange-50/30"
                      }`}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileSelect}
                      />

                      {resume ? (
                        <div className="flex items-center gap-3 w-full max-w-[80%] bg-white p-3 rounded-lg shadow-sm border border-green-100">
                          <div className="bg-green-100 p-2 rounded-lg text-green-600">
                            <FileText size={20} />
                          </div>
                          <div className="flex-1 text-left overflow-hidden">
                            <p className="text-xs font-bold text-gray-900 truncate">
                              {resume.name}
                            </p>
                            <p className="text-[10px] text-gray-500">
                              {(resume.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={removeFile}
                            className="p-1 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div
                            className={`p-3 rounded-full mb-2 transition-colors ${
                              isDragging
                                ? "bg-orange-100 text-[#FF5200]"
                                : "bg-gray-100 text-gray-400 group-hover:text-[#FF5200] group-hover:bg-orange-100"
                            }`}
                          >
                            <Upload size={24} />
                          </div>
                          <p className="text-xs font-bold text-gray-700">
                            {isDragging
                              ? "Drop file here!"
                              : "Click to upload or drag and drop"}
                          </p>
                          <p className="text-[10px] text-gray-400 mt-1">
                            PDF, DOCX up to 5MB
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  {/* --------------------------------------- */}

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">
                      Why do you want to join us?
                    </label>
                    <textarea
                      rows="3"
                      placeholder="Tell us a bit about yourself..."
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#FF5200] transition-colors text-sm resize-none"
                    ></textarea>
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-3 text-sm font-bold text-gray-600 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  form="application-form"
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-[2] py-3 text-sm font-bold text-white bg-[#FF5200] hover:bg-orange-600 rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>Processing...</>
                  ) : (
                    <>
                      Submit Application <CheckCircle size={16} />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Careers;
