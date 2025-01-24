  import React, { useEffect, useState } from "react";
  import { useSelector, useDispatch } from "react-redux";
  import { fetchAllFiles } from "../features/sample/sampleApis";
  import { BsFileEarmarkPdf } from "react-icons/bs";
  import PreviewPdf from "./PreviewPdf";
  import { GiHamburgerMenu } from "react-icons/gi";
  import axios from 'axios';
  import Register from "./Register";
  import Login from "./Login";

  const RequinSample = () => {
  const [searchFile, setSearchFile] = useState("");
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All"); 
  const [activeModal, setActiveModal] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const dispatch = useDispatch();
  const { sampleFiles, sampleUpload } = useSelector((state) => state.AllSample);
  // const { sampleUpload } = useSelector((state) => state.sample);
  const [showPdf, setShowPdf] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(false)

  const User = JSON.parse(sessionStorage.getItem('user'))
  const {isAuthenticated} = useSelector((state) => state.auth);
  // console.log("user now", User);
  const [userData] = useState(User)
  
  const toggleModal = (modalType) => {
    setActiveModal(activeModal === modalType ? null : modalType);
  };
    
  useEffect(() => {
    dispatch(fetchAllFiles());
  }, [dispatch]);

  useEffect(()=>{
    if(User){
    setLoggedInUser(true)
    }else{
      setLoggedInUser(false)
    }
  }, [User])

  useEffect(() => {
    if (sampleFiles?.data?.length) {
        // Filter files based on category
        var filtered = sampleFiles.data.filter((file) => {
            if (selectedCategory === "All") return true;

            const fileExtension = file?.sampleFile?.split('.').pop().toLowerCase();

            if (selectedCategory === "Documents" && fileExtension === "pdf") return true;

            if (
                selectedCategory === "Documents" &&
                ["doc", "docx", "xls", "xlsx", "csv"].includes(fileExtension)
            ) return true;

            if (
                selectedCategory === "Images" &&
                ["jpg", "jpeg", "png", "gif", "bmp", "svg"].includes(fileExtension)
            ) return true;

            return false;
        });

        if (User?.role === "user" || User?.role === "admin") {
          setFilteredFiles(filtered);
        }else{
          setFilteredFiles(filtered.slice(0, 2))
        }
    }
  }, [sampleFiles, selectedCategory, User?.role, sampleUpload]);

  const handleDeleteFile = async (fileId) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/sample/deleteFile/${fileId}`);
    
    if (response.status === 200) {
      console.log("File deleted successfully");

      const updatedFiles = filteredFiles.filter(file => file._id !== fileId);
      setFilteredFiles(updatedFiles);

      if (selectedFileId === fileId) {
        setShowPdf(false);
      }
    }
  } catch (error) {
    console.error("Error deleting file:", error);
  }
  };

  const handleEditFile = async (fileId, updatedData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/sample/editFile/${fileId}`, updatedData);
    
    if (response.status === 200) {
      console.log("File edited successfully");
    }
  } catch (error) {
    console.error("Error deleting file:", error);
  }
  };


  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-b from-[#f5f5f5] to-[#e0e0e0] overflow-x-hidden">
      {/* Sidebar */}
      <div className="flex justify-center mt-16 mx-6 flex-col">
        <div className="flex flex-row md:gap-14 gap-8 md:text-2xl text-base text-accent mb-2">
          {["All", "Documents", "Images", "Study Guides"].map((category) => (
            <div
              key={category}
              className={`${selectedCategory === category ? "underline underline-offset-[13px] decoration-accent" : " "}`}
            >
              <p className="hover:underline underline-offset-[13px] decoration-accent hover:cursor-pointer"
              onClick={()=>setSelectedCategory(category)}
              >{category === "All" ? "All" : `${category}`}</p>
            </div>
          ))}
        </div>
        <hr className="w-full border-t h-4 border-[#B1C4D8]" />
      </div>

 

      {/* Main Content */}
      <div className="lg:w-full w-full p-4 lg:p-8 overflow-x-hidden">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            className="w-1/4 p-3 rounded-md border border-[#A8B2C1] focus:outline-none focus:ring-2 focus:ring-[#00ABE4] text-[#333333]"
            onChange={(e) => setSearchFile(e.target.value)}
            value={searchFile}
            placeholder="Search file..."
          />
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredFiles.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-lg font-semibold text-[#A8B2C1]">No files updated yet</p>
          </div>
          ) : (
        filteredFiles
        .filter((file) =>
        file.sampleName.toLowerCase().includes(searchFile.toLowerCase())
        )
        .map((file, i) => (
        <div
          key={i}
          className="bg-white shadow-lg rounded-lg p-4 flex items-center gap-4 hover:shadow-2xl transition-shadow duration-200 cursor-pointer"
          onClick={() => {
            setSelectedFileId(file._id);
            setShowPdf(true);
          }}
        >
          {/* PDF Icon */}
          <BsFileEarmarkPdf className="text-[#00ABE4] text-4xl" />
          {/* File Info */}
          <div>
            <p className="text-lg font-semibold text-[#333333]">{file.sampleName}</p>
            <p className="text-sm text-[#A8B2C1]">{file.fileType} File</p>
          </div>
        </div>
      ))
      )}
      </div>
        {
          userData?.role !== "admin" && userData?.role !== "user" ? (
            <p className="mt-24 justify-self-center cursor-pointer text-2xl" onClick={() => toggleModal("register")}>Show more....</p>
          ) : " "
        }
      </div>
      {/* Show PDF preview if a file is selected */}
      {selectedFileId && (
        <PreviewPdf
          fileId={selectedFileId}
          setShowPdf={setShowPdf}
          showPdf={showPdf}
          sampleFiles={sampleFiles}
          handleDeleteFile={handleDeleteFile}
          handleEditFile={handleEditFile}
        />
      )}
      
      <Register
        register={activeModal === "register" && !loggedInUser}
        setRegister={() => toggleModal("register")}
        setLogin={() => toggleModal("login")}
      />
      <Login
        login={activeModal === "login" && !loggedInUser}
        setLogin={() => toggleModal("login")}
        setRegister={() => toggleModal("register")}
      />

    </div>
  );
  };

  export default RequinSample;
