const {uploadSample, getAllFiles, deleteFile, findSample, EditSample} = require("../controllers/sampleFileController")

const router = require("express").Router();

router.post("/sample-upload", uploadSample);
router.get("/get-allfiles", getAllFiles);
router.post("/deleteFile/:fileId", deleteFile);
router.get("/findFile/:fileId", findSample);
router.post("/editFile/:fileId", EditSample);

module.exports = router