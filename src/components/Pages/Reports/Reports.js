import React, { useState } from "react";
import { fetchReports } from "api/reportApi";
import "./reports.scss";

const handleDownload = async () => {
  try {
    const resp = await fetchReports();

    const blob = new Blob([resp], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    console.log(blob.size, blob.type);

    const filename = "reports.xlsx";

    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();

    URL.revokeObjectURL(url);
    document.body.removeChild(downloadLink);
  } catch (error) {
    console.error("Error downloading the file:", error);
  }
};

const Reports = () => {
  const [loading, setLoading] = useState(false);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/reports");
      if (!response.ok) throw new Error("Failed to fetch reports");
      const data = await response.blob();
      return data;
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-page">
      <h1 className="report-title">Download Report</h1>

      <p className="report-description">
        Click the button below to download the latest report in Excel format
        (.xlsx).
      </p>

      <div className="download-button-container">
        <button
          className={`btn-download ${loading ? "loading" : ""}`}
          onClick={handleDownload}
          disabled={loading}
        >
          {loading ? "Downloading..." : "Download Report"}
        </button>
      </div>
    </div>
  );
};

export default Reports;
