import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFiles } from '../features/sample/sampleApis';

const SampleAdmin = () => {
  const dispatch = useDispatch();
  const { sampleFiles } = useSelector((state) => state.AllSample);
  console.log("sampleFiles", sampleFiles);
  

  useEffect(() => {
    dispatch(fetchAllFiles());
  }, [dispatch]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Sample Files Details</h1>

      {sampleFiles && sampleFiles?.data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sampleFiles?.data.map((file) => (
            <div key={file.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 truncate">{file.sampleName}</h2>
                <p className="text-gray-600 text-sm mt-2">Size: {file?.sampleFileDetails.size} KB</p>
                <p className="text-gray-600 text-sm">Uploaded By: {file?.sampleUploaderDetails.userName}</p>
                <p className="text-gray-600 text-sm">Date: {new Date(file?.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex justify-center mt-4 mb-3">
                <a
                  href={file.sampleFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition"
                >
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No files available to display.</p>
      )}
    </div>
  );
};

export default SampleAdmin;
