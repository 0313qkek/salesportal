import React, { useState, useEffect } from "react";
import "./SharedFiles.css";

function SharedFiles() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  const AUTH_URL =
    process.env.REACT_APP_AUTH_URL || "https://localhost:4000/auth/microsoft";
  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "https://localhost:4000";

  // Capture token from URL and reload user context
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      urlParams.delete("token");
      window.history.replaceState({}, document.title, window.location.pathname);
      window.location.reload();
    }
  }, []);

  // Check Microsoft connection
  useEffect(() => {
    const checkMicrosoftConnection = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/users/check-connection`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (!response.ok) throw new Error("Failed to check Microsoft connection.");
        const data = await response.json();
        setIsConnected(data.connected);
      } catch (error) {
        console.error("Error checking Microsoft connection:", error);
      }
    };

    checkMicrosoftConnection();
  }, [API_BASE_URL]);

  // Fetch files if connected
  useEffect(() => {
    const fetchFiles = async () => {
      if (!isConnected) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/shared-files`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (response.ok) {
          const data = await response.json();
          setFiles(data);
        } else {
          console.error("Error fetching shared files:", await response.text());
          if (response.status === 401) {
            alert("Session expired. Please log in again.");
            localStorage.removeItem("token");
            window.location.href = AUTH_URL;
          } else {
            throw new Error(`Failed to fetch files: ${response.statusText}`);
          }
        }
      } catch (error) {
        console.error("Error fetching shared files:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [API_BASE_URL, isConnected]);

  // Loading indicator
  if (loading) return <p>Loading...</p>;

  return (
    <div className="shared-files-container">
      <h2>Shared Files</h2>
      {!isConnected ? (
        <div className="connect-container">
          <button onClick={() => (window.location.href = AUTH_URL)}>
            Connect Microsoft Account
          </button>
          <p className="connect-info">
            Please connect with your Microsoft account to view shared files.
          </p>
        </div>
      ) : files.length === 0 ? (
        <p>No shared files found.</p>
      ) : (
        <div className="files-grid">
          {files.map((file) => (
            <div key={file.id} className="file-card">
              <div className="file-details">
                <p className="file-name">{file.name}</p>
                <p className="file-size">{file.size} bytes</p>
                <p className="file-type">{file.fileType || "Unknown Type"}</p>
                <p className="file-date">
                  {new Date(file.lastModifiedDateTime).toLocaleDateString()}
                </p>
              </div>
              <div className="file-actions">
                <a
                  href={file.webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn"
                >
                  View
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SharedFiles;