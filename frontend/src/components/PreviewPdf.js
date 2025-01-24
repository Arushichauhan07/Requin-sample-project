import React, { lazy, Suspense, useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { Worker } from '@react-pdf-viewer/core';
import { SpecialZoomLevel } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/thumbnail/lib/styles/index.css';
import { MdOutlineFileDownload } from "react-icons/md";
import { BsTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

const LazyViewer = lazy(() =>
    import('@react-pdf-viewer/core').then((module) => ({ default: module.Viewer }))
);

const User = JSON.parse(sessionStorage.getItem('user'))

const PreviewPdf = ({
    showPdf,
    ClosePreviewPdf,
    sampleFiles,
    fileId,
    setShowPdf,
    handleDeleteFile,
    handleEditFile,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedData, setUpdatedData] = useState({
        sampleName: '',
        sampleFile: null,
    });
    const [showMetaData, setShowMetaData] = useState(true)
    
    const formatFileSize = (size) => {
        if (size === 0) return '0 Bytes';
        const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(size) / Math.log(1024));
        return `${(size / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
    };

    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUpdatedData((prev) => ({
                ...prev,
                sampleFile: file,
            }));
        }
    };
    const handleEditSubmit = async () => {
        const formData = new FormData();
        formData.append('sampleName', updatedData.sampleName);
        if (updatedData.sampleFile) {
            formData.append('sampleFile', updatedData.sampleFile);
        }

        await handleEditFile(fileId, formData);
        setIsEditing(false);
    };

    return (
        <>
            {/* Background overlay */}
            <div className={`fixed inset-0 bg-black opacity-50 z-50 ${showPdf ? 'block' : 'hidden'}`}></div>

            {/* PDF viewer modal */}
            <div className={`fixed inset-0 flex justify-center items-center z-50 ${showPdf ? 'block' : 'hidden'}`}>
                <div className="relative h-[40rem] w-[40rem] md:w-[80rem] md:h-[40rem] bg-[#fdfcf3] p-8 rounded-3xl shadow-lg">
                    {/* Close button */}
                    <RxCross2
                        size={"2rem"}
                        onClick={() => setShowPdf(false)}
                        className="absolute text-black top-2 right-2 cursor-pointer rounded-full"
                    />

                    {/* PDF content */}
                    {sampleFiles?.data.map((file, index) => (
                        fileId === file._id ? (
                            <div key={index} className="h-full flex flex-col scrollable-pdf-viewer">
                                {/* Header */}
                                <div className="flex flex-row justify-between items-center">
                                    {!isEditing ? (
                                        <h1 className="text-black text-2xl font-medium mb-4">
                                            {file.sampleName}
                                        </h1>
                                    ) : (
                                        <input
                                            type="text"
                                            name="sampleName"
                                            value={updatedData.sampleName}
                                            placeholder="Edit sample name"
                                            onChange={handleInputChange}
                                            className="text-black text-2xl font-medium mb-4 p-2 border"
                                        />
                                    )}
                                </div>

                                {/* File Viewer or Upload */}
                                {!isEditing ? (
                                    file.sampleFile.endsWith("pdf") || file.sampleFile.endsWith("xml") ? (
                                        <div className="h-full overflow-auto custom-pdf-container rounded-2xl">
                                            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                                                <Suspense fallback={<div>Loading...</div>}>
                                                    <LazyViewer
                                                        fileUrl={file.sampleFile}
                                                        defaultScale={SpecialZoomLevel.PageFit}
                                                    />
                                                </Suspense>
                                            </Worker>
                                        </div>
                                    ) : file.sampleFile.endsWith("jpeg") || file.sampleFile.endsWith("jpg") || file.sampleFile.endsWith("png") ? (
                                        <img src={file.sampleFile} alt="sample file" className='h-3/4 w-full'/>
                                    ) : (
                                        "Uploaded"
                                    )
                                ) : (
                                    <div>
                                        <label className="block text-black text-sm font-medium mb-2">Upload New File</label>
                                        <input
                                            type="file"
                                            accept=".pdf,.xml,.jpeg,.jpg"
                                            onChange={handleFileChange}
                                            className="border p-2 rounded w-full"
                                        />
                                    </div>
                                )}

                                {/* Metadata and Action Buttons */}
                                <div className={`flex flex-row items-center justify-between mt-10`}>
                                    <div className="flex flex-row gap-2 mx-auto justify-center items-center">
                                        <p className="text-xs font-medium">
                                            {new Date(file.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </p>
                                        <span className="border-l h-6 border-black"></span>
                                        <p className="text-xs font-medium">
                                            {new Date(file.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                        <span className="border-l h-6 border-black"></span>
                                        <p className="text-xs font-medium">{formatFileSize(file.sampleFileDetails.sampleFile.size)}</p>
                                    </div>

                                    <div className={`flex flex-row gap-8 text-black ${showMetaData ? "block" : "hidden"}`}>
                                        <MdOutlineFileDownload
                                            size={"2rem"}
                                            className={`cursor-pointer ${User?.role === "admin" || User?.role === "user" ? "block" : "hidden"}`}
                                            onClick={() => window.open(file.sampleFile)}
                                        />
                                        <BsTrashFill
                                            size={"1.5rem"}
                                            className={`cursor-pointer ${User?.role === "admin" ? "block" : "hidden"}`}
                                            onClick={() => handleDeleteFile(fileId)}
                                        />
                                        {/* <AiFillEdit
                                        size={"2rem"}
                                        className={`cursor-pointer ${User?.role === "admin" ? "block" : "hidden"}`}
                                        onClick={() => {
                                            setIsEditing(true);
                                            setUpdatedData({
                                                sampleName: file.sampleName,
                                            });
                                            setShowMetaData(false)
                                        }}
                                    /> */}
                                    </div>
                                </div>

                                {/* Edit Submission Button */}
                                {isEditing && (
                                    <div className="flex justify-end mt-4">
                                        <button
                                            onClick={handleEditSubmit}
                                            className="bg-green-500 text-white px-4 py-2 rounded"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : null
                    ))}
                </div>
            </div>
        </>
    );
};

export default PreviewPdf;
