import { useState } from "react";

function FileUpload() {
  const [uploading, setUploading] = useState(false);

  const uploadFile = async (file) => {
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData
      });
      alert("Uploaded successfully!");
    } catch {
      alert("Upload failed");
    }

    setUploading(false);
  };

  return (
    <div className="mb-6 p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
      
      <h2 className="text-white text-lg font-semibold mb-3">
        Upload Document
      </h2>

      <div className="flex flex-col md:flex-row gap-3 items-center">
        
        <input
          type="file"
          onChange={(e) => uploadFile(e.target.files[0])}
          className="text-sm text-gray-200"
        />

        <button
          disabled={uploading}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:scale-105 transition"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>

      </div>
    </div>
  );
}

export default FileUpload;