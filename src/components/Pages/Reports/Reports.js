import React, { useState } from "react";
import { fetchReports } from "api/reportApi";
import "./reports.scss";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const Reports = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/reports");
      if (!response.ok) throw new Error("Failed to fetch reports");
      toast.error(t("reports.toast.fetchError"));
      const data = await response.blob();
      return data;
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

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
      toast.success(t("reports.toast.downloadSuccess"));
      URL.revokeObjectURL(url);
      document.body.removeChild(downloadLink);
    } catch (error) {
      toast.error(t("reports.toast.downloadError"));
      console.error("Error downloading the file:", error);
    }
  };

  return (
    <div className="report-page">
      <h1 className="report-title">{t("reports.download_report")}</h1>

      <p className="report-description">{t("reports.download_description")}</p>

      <div className="download-button-container">
        <button
          className={`btn-download ${loading ? "loading" : ""}`}
          onClick={handleDownload}
          disabled={loading}
        >
          {loading ? t("reports.downloading") : t("reports.download_report")}
        </button>
      </div>
    </div>
  );
};

export default Reports;
