const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } =require("@aws-sdk/client-s3")
const { getSignedUrl }= require("@aws-sdk/s3-request-presigner")
require('dotenv').config()

const bucketName = process.env.BUCKET_NAME
const region = process.env.BUCKET_REGION
const accessKeyId = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY


const s3Client = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey
    }
})

const uploadFile=(fileBuffer, fileName, mimetype) =>{
    const uploadParams = {
      Bucket: bucketName,
      Body: fileBuffer,
      Key: fileName,
      ContentType: mimetype
    }
  
    return s3Client.send(new PutObjectCommand(uploadParams));
}

const deleteFile=(fileName)=> {
    const deleteParams = {
      Bucket: bucketName,
      Key: fileName,
    }
  
    return s3Client.send(new DeleteObjectCommand(deleteParams));
}

const getObjectSignedUrl=async(key) =>{
    const params = {
      Bucket: bucketName,
      Key: key
    }
  
    const command = new GetObjectCommand(params);
    const seconds = 60
    const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });
  
    return url
}

module.exports = uploadFile
module.exports = getObjectSignedUrl
module.exports = deleteFile
  