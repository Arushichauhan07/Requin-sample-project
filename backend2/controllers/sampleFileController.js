const AWS = require('aws-sdk');
const Sample = require("../models/sampleModel");
require("dotenv").config();


const s3 = new AWS.S3({
    endpoint:"https://nyc3.digitaloceanspaces.com",
    region:"us-east-1",
    accessKeyId: process.env.AWS_ACCESSKEYID,
    secretAccessKey: process.env.AWS_SECRETACCESSKEY
})


const uploadSample = async (req, res) => {
    try {
        const uploadedFile  = req.files; 
        const {sampleName, userId}  = req.body;
        
        const awsuploads = await uploadFileOnly(uploadedFile.sampleFile.data, uploadedFile.sampleFile.name, "");
        const data = new Sample({
            sampleName:sampleName,
            sampleFile: awsuploads.data,
            sampleFileDetails:uploadedFile,
            sampleUploaderDetails:userId
        });


        await data.save();

        const allFiles = await Sample.find({});

        return res.status(200).json({
            status: 200,
            message: "Uploaded successfully",
            data: data,
            allFiles: allFiles,
        });
    } catch (error) {
        console.error("Error during upload:", error);
        return res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};

const getAllFiles = async(req, res) => {
    try {
        const allFiles = await Sample.find({}).populate('sampleUploaderDetails')

        res.status(200).json({
            status:200,
            data:allFiles
        })
        
    } catch (error) {
        res.status(400).json({
            status:400,
            message:error.message
        })
    }
}

const deleteFile = async(req, res)=> {
    try {
        const {fileId} = req.params
        
        const deletedFile = await Sample.findByIdAndDelete(fileId)
        
        if(!deletedFile){
            return res.status(404).json({
                message: "File not found",
                status: 404
            })
        }

        res.status(200).json({
            message:"File deleted Sucessfully",
            status:200
        });
    } catch (error) {
        console.log("error", error)

        res.status(400).json({
            message:error.message,
            status:400
        })
    }
}

const findSample = async(req, res) => {
        try {
            const { fileId } = req.params

            const findFile = await Sample.findById(fileId)

            if(!findFile){
                return res.status(404).json({
                    status:404,
                    message:"File not found"
                })
            }

            res.status(200).json({
                status:200,
                message:"File found",
                findFile 
            })
        } catch (error) {
            res.status(400).json({
                status:400,
                message:error.message
            })
        }
}

const EditSample = async(req, res) => {
    try {
        const { fileId } = req.params;
        const { sampleName } = req.body;
        const { sampleFile } = req.files
        
        const findFile = await Sample.findById(fileId)

        if(!findFile){
            return res.status(404).json({
                status:404,
                message:"File not found"
            })
        }

        const awsuploads = await uploadFileOnly(sampleFile.data, sampleFile.name, "");
        findFile.sampleName = sampleName || findFile.sampleName;
        findFile.sampleFile = awsuploads.data || findFile.uploadedFile;
        findFile.sampleFileDetails = sampleFile || findFile.sampleFileDetails;


        

        const updatedFile = await findFile.save()

        res.status(200).json({
            status:200,
            message:"File found",
            updatedFile 
        })
    } catch (error) {
        res.status(400).json({
            status:400,
            message:error.message
        })
    }
}

const uploadFileOnly = (fileContent, fileName, ContentEncoding) => {
    
    const params = {
        Bucket: process.env.AWS_BUCKETNAME,  
        Key: fileName,
        Body: fileContent,
        ACL: 'public-read',  
    };

    if (ContentEncoding) {
        params.ContentEncoding = ContentEncoding;
    }

    
    return new Promise((resolve, reject) => {
        s3.upload(params, function (err, data) {
            if (err) {
                console.error("S3 Upload Error:", err);
                reject({
                    statusCode: 500,
                    error: err,
                });
                return;
            }
            resolve({
                statusCode: 200,
                data: data.Location, 
            });
        });
    });
};

module.exports = { uploadSample, getAllFiles, deleteFile, findSample, EditSample};
