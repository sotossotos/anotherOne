// const AWS = require('aws-sdk');
import AWS from 'aws-sdk';

const s3Client = new AWS.S3({
  s3ForcePathStyle: true,
  region: 'localhost',
  endpoint: 'http://localhost:7000',
  accessKeyId: 'S3RVER',
  secretAccessKey: 'S3RVER'
});

export const S3 = {
  /**
   * 
   * @param {String} fileName 
   * @param {String} bucket 
   * @returns {JSON}
   */
  async get(fileName, bucket) {

    const params = {
      Bucket: bucket,
      Key: fileName,
    };

    let data = await s3Client.getObject(params).promise();

    if (!data) {
      throw Error(`Failed to get file ${fileName}, from ${bucket}`);
    }
    // if it is a json file then data should be json object
    if (/\.json$/.test(fileName)) {
      data = JSON.parse(data.Body.toString());
    }
    return data;
  },
  /**
   * 
   * @param {JSON} data 
   * @param {String} fileName 
   * @param {String} bucket 
   * @returns {JSON}
   */
  async write(data, fileName, bucket) {
    const params = {
      Bucket: bucket,
      Body: JSON.stringify(data),
      Key: fileName,
    };

    const newData = await s3Client.putObject(params).promise();

    if (!newData) {
      throw Error('there was an error writing the file');
    }

    return newData;
  },
  /**
   * 
   * @param {*} imageBuffer 
   * @param {String} fileName 
   * @param {String} bucket 
   * @returns {*}
   */
  async writeImage(imageBuffer, fileNameForS3, bucket) {
    const params = {
      Bucket: bucket,
      Body: imageBuffer,
      Key: fileNameForS3,
    };

    const newData = await s3Client.putObject(params).promise();

    if (!newData) {
      throw Error('there was an error writing the file');
    }

    return newData;
  },
};

