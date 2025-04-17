import React, { useState } from "react";
import axios from "axios";
import Navbar from "./shared/Navbar"; 

const RemoteJobSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRemoteJobs = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setJobs([]);
    setError("");

    try {
      const options = {
        method: "GET",
        url: "https://remote-jobs1.p.rapidapi.com/jobs",
        params: {
          search: searchTerm,
          offset: "0",
          country: "in",
          employmentType: "fulltime",
        },
        headers: {
          "x-rapidapi-key": "7ba2cdfa25msh23e9fe866328575p12d494jsn85cb70ff8ea3",
          "x-rapidapi-host": "remote-jobs1.p.rapidapi.com",
        },
      };

      const response = await axios.request(options);
      const jobsData = response.data || [];

      // Extract only title and url
      const formattedJobs = jobsData.map((job) => ({
        title: job.title,
        url: job.url,
      }));

      setJobs(formattedJobs);
    } catch (err) {
      setError("Failed to fetch remote jobs. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-sky-950 via-slate-900 to-black pt-16 p-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">🌐 Remote Job Search</h1>
          <p className="text-sm mb-4">Search for remote full-time jobs in India</p>

          <div className="flex gap-2 justify-center mb-6">
            <input
              type="text"
              placeholder="Enter job title (e.g. Frontend)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-3 rounded-lg bg-gray-200 text-black w-full max-w-sm"
            />
            <button
              onClick={fetchRemoteJobs}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg transition"
            >
              Search
            </button>
          </div>

          {loading && <p>Loading remote jobs...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && jobs.length === 0 && <p>No jobs found. Try a different search.</p>}

          <div className="mt-6 grid gap-4 text-left">
            {jobs.map((job, index) => (
              <div
                key={index}
                className="p-4 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition"
              >
                <h2 className="text-lg font-semibold text-pink-400">{job?.title}</h2>
                <a
                  href={job?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline text-sm"
                >
                  View Job
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoteJobSearchPage;
