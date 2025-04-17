import React, { useState } from "react";
import axios from "axios";
import Navbar from "./shared/Navbar";
import { toast } from "sonner";

const JobNotificationPage = () => {
  const [titleFilter, setTitleFilter] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

  const formatSalary = (salary) => {
    if (!salary?.value) return "Not Disclosed";
    return `${salary.currency} ${salary.value.toLocaleString()} / ${salary.value.unitText || "YEAR"}`;
  };

  const fetchJobs = async () => {
    if (!titleFilter.trim()) return;

    const today = new Date().toLocaleDateString();
    const cacheKey = `jobs-${titleFilter.toLowerCase()}`;
    const cached = JSON.parse(localStorage.getItem(cacheKey));

    // Use cached data if available and not expired
    if (cached && cached.date === today) {
      setJobs(cached.jobs);
      return;
    }

    setLoading(true);
    setError("");
    setJobs([]);

    const fetchFromAPI = async (apiKey) => {
      const options = {
        method: "GET",
        url: "https://active-jobs-db.p.rapidapi.com/active-ats-24h",
        params: {
          limit: "10",
          offset: "0",
          title_filter: `"${titleFilter}"`,
          location_filter: `"India"`,
          description_type: "text",
        },
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": "active-jobs-db.p.rapidapi.com",
        },
      };

      const response = await axios.request(options);
      return response.data;
    };

    try {
      let data;
      try {
        data = await fetchFromAPI("dbdce0c552mshfe1af789924d51dp1db0dajsnafb2fb9eea95");
      } catch (e) {
        console.warn("Primary API failed. Trying fallback...");
        data = await fetchFromAPI("7ba2cdfa25msh23e9fe866328575p12d494jsn85cb70ff8ea3");
      }

      const jobsArray = Object.values(data);
      setJobs(jobsArray);

      // Cache the response
      localStorage.setItem(cacheKey, JSON.stringify({ date: today, jobs: jobsArray }));
    } catch (err) {
      setError("Failed to fetch jobs. Please try again later.");
      toast.error("Failed to fetch jobs. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-sky-950 via-slate-900 to-black min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto pt-20 px-4">
        <h1 className="text-4xl font-extrabold text-center text-white mb-2">🚀 Daily Job Update</h1>
        <p className="text-center text-gray-300 mb-6">Filtered by Location: <b>India</b></p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-3 mb-8">
          <input
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
            placeholder="Enter job title (e.g. Data Analyst)"
            className="p-3 rounded-xl bg-slate-200 text-black w-full max-w-sm"
          />
          <button
            onClick={fetchJobs}
            className="bg-blue-600 text-white font-semibold px-5 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {loading && <div className="text-center text-lg text-white animate-pulse">🔄 Fetching jobs...</div>}
        {error && <p className="text-red-400 text-center">{error}</p>}

        <div className="grid gap-6">
          {!loading && jobs.length === 0 && (
            <p className="text-center text-white/70">No jobs found. Try a different title.</p>
          )}

{jobs.map((job) => (
  <div
    key={job.id}
    className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-sky-950/70 to-black/70 backdrop-blur-lg border border-white/10 shadow-lg hover:shadow-blue-700/30 transition duration-300"
  >
    {/* Gradient border hover effect */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl"></div>

    <h2 className="text-2xl font-bold text-cyan-400 mb-1">{job?.title}</h2>
    <p className="text-white/90 font-medium mb-2">{job?.organization}</p>

    <div className="flex flex-wrap gap-4 text-sm text-white/70 mb-2">
      <span>🗓️ {formatDate(job?.datePosted)}</span>
    </div>


    <a
      href={job?.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block mt-4 text-sm font-semibold text-blue-400 hover:underline hover:text-blue-300 transition"
    >
      🔗 Apply Now
    </a>
  </div>
))}

        </div>
      </div>
    </div>
  );
};

export default JobNotificationPage;
