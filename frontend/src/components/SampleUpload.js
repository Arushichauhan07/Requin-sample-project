import React, { useState, lazy, Suspense } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { sampleFileUpload } from "../features/sample/sampleApis";
import { Worker } from '@react-pdf-viewer/core';
import { SpecialZoomLevel } from '@react-pdf-viewer/core';
import { BsFillCloudArrowUpFill } from "react-icons/bs";

const LazyViewer = lazy(() =>
  import('@react-pdf-viewer/core').then((module) => ({ default: module.Viewer }))
);

const SampleUpload = ({ openSample, setOpenSample }) => {
  const [sampleName, setSampleName] = useState("");
  const [sampleFile, setSampleFile] = useState(null); // Use `null` initially for better handling of uninitialized state.
  const dispatch = useDispatch();
  
  const User = JSON.parse(sessionStorage.getItem('user'));
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0]; // Access the first file
    if (file) {
      setSampleFile(file); // Set the selected file in state

      if (!sampleName) {
        alert("Please enter a sample name.");
        return;
      }

      // Prepare FormData to send the file and other data
      const formData = new FormData();
      formData.append("sampleName", sampleName);
      formData.append("sampleFile", file);
      formData.append("userId", User._id);

      // Dispatch the file upload action immediately
      dispatch(sampleFileUpload(formData));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sampleName || !sampleFile) {
      alert("Please fill in all fields.");
      return;
    }

    // Here you can handle any additional logic if needed after submission
    setSampleName("");
    setSampleFile(null);
    setOpenSample(false);
  };

  return (
    <div
      className={`${
        openSample
          ? "opacity-100 scale-100 translate-x-0"
          : "opacity-0 scale-50 translate-x-full"
      } fixed inset-0 flex items-center justify-center z-50 transition-all duration-300`}
    >
      <div className="h-[40rem] w-[60rem] bg-white rounded-lg shadow-lg border border-gray-200 p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Upload Your Sample File</h2>
          <button
            onClick={() => setOpenSample(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl focus:outline-none"
          >
            <RxCross2 />
          </button>
        </div>

        {/* Form Section */}
        <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
          {/* Input for Sample Name */}
          <div>
            <label
              htmlFor="sampleName"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Sample Name
            </label>
            <input
              id="sampleName"
              type="text"
              name="sampleName"
              value={sampleName}
              onChange={(e) => setSampleName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Enter sample name"
            />
          </div>

          {/* File Input Section */}
          <div>
            <label
              htmlFor="sampleFile"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Upload File
            </label>
            {sampleFile ? (
              <div className="w-full h-80 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md relative">
                {/* Display preview for image files */}
                {sampleFile.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(sampleFile)}
                    alt="Uploaded file"
                    className="h-full w-full object-cover rounded-md"
                  />
                ) : sampleFile.type.endsWith("pdf") ? (
                  <div className="w-full h-full overflow-auto">
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                      <Suspense fallback={<div>Loading...</div>}>
                        <LazyViewer
                          fileUrl={URL.createObjectURL(sampleFile)}
                        />
                      </Suspense>
                    </Worker>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full w-full">
                    <span className="text-lg font-medium text-gray-700 mb-2">
                      {sampleFile.name}
                    </span>
                    <span className="text-sm text-gray-500">{sampleFile.type}</span>
                  </div>
                )}
                {/* Add a Remove button */}
                <button
                  onClick={() => setSampleFile(null)}
                  className="absolute top-2 right-2 bg-red-500 text-white text-sm px-2 py-1 rounded-full hover:bg-red-600 focus:outline-none"
                >
                  Remove
                </button>
              </div>
            ) : (
              <label
                htmlFor="sampleFile"
                className="w-full h-[22rem] flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-400 hover:text-blue-400 transition text-gray-500 bg-gray-50"
              >
                <BsFillCloudArrowUpFill className="h-24 w-24 text-blue-500" />
                <span className="mb-2 text-lg font-medium">Drag and drop a file</span>
                <span className="text-sm text-gray-400">or click to upload</span>
              </label>
            )}
            <input
              id="sampleFile"
              type="file"
              name="sampleFile"
              className="hidden"
              onChange={handleFileChange} // Add onChange to capture file input
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-1/3 py-2 px-4 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition"
            >
              Upload File
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SampleUpload;
