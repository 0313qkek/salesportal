import React, { useState } from 'react';
import './Sharedfiles.css';

const sharedFilesData = [
  { id: 1, name: 'Project Report.pdf', size: '1.2 MB', type: 'PDF', date: 'Sep 28, 2024' },
  { id: 2, name: 'Logo.png', size: '500 KB', type: 'Image', date: 'Sep 25, 2024' },
  { id: 3, name: 'Presentation.pptx', size: '4.1 MB', type: 'Presentation', date: 'Sep 20, 2024' },
  { id: 4, name: 'Meeting Notes.docx', size: '800 KB', type: 'Document', date: 'Sep 15, 2024' },
];

function SharedFiles() {
  const [files] = useState(sharedFilesData);

  return (
    <div className="shared-files-container">
      <h2>Shared Files</h2>
      <div className="files-grid">
        {files.map((file) => (
          <div key={file.id} className="file-card">
            <div className="file-details">
              <p className="file-name">{file.name}</p>
              <p className="file-size">{file.size}</p>
              <p className="file-type">{file.type}</p>
              <p className="file-date">{file.date}</p>
            </div>
            <div className="file-actions">
              <button className="action-btn">Preview</button>
              <button className="action-btn">Download</button>
              <button className="action-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SharedFiles;