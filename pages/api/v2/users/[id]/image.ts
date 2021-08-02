import prisma from '../../../../../lib/prisma';
import AWS from 'aws-sdk';
import formidable from 'formidable-serverless';
import fs from 'fs';
import sharp from 'sharp';
import { IApiResponse } from '../../../../../types';
import { NextApiRequest, NextApiResponse } from 'next';

interface IUploadImageResponse extends IApiResponse {
    url?: string;
}

export const config = { // idk if this shit is going to give me hell
    api: {
        bodyParser: false,
    },
};

export default async (req: NextApiRequest, res: NextApiResponse<IUploadImageResponse>) => {

    const {
        method,
        query: { id }, // key used to be passed here but now is not
        body: { key }, // had different names on frontend
    } = req;

    console.log('key', key);

    try {
        // GET: profile image
        if (method === 'GET') {
            // dont have any use for this right now
        }

        // POST: upload profile image
        if (method === 'POST') {
            // create S3 instance with credentials
            const s3 = new AWS.S3({
                endpoint: new AWS.Endpoint('nyc3.digitaloceanspaces.com'),
                accessKeyId: process.env.SPACES_KEY,
                secretAccessKey: process.env.SPACES_SECRET,
                region: 'nyc3',
            });
            // parse request to readable form
            const form = new formidable.IncomingForm();
            form.parse(req, async (err, fields, files) => {
                // Account for parsing errors
                if (err) throw new Error(err);
                // Convert to binary string
                const file = fs.readFileSync(files.file.path);
        
                console.log('file', file);
        
                const params = {
                    Bucket: process.env.SPACES_BUCKET,
                    ACL: 'public-read',
                    Key: `ProfileImages/${key}`,
                    Body: file,
                    ContentType: 'image/jpeg',
                };
        
                // Downsize the image
                await sharp(file)
                    .resize(200, 200) // width, height
                    .toBuffer()
                    .then((buffer) => {
                        console.log('sharp success', buffer);
                        params.Body = buffer;
                    })
                    .catch((err) => {
                        throw new Error(err);
                    });
        
                // Upload and send the file
                await s3.upload(params).send(async (err, data) => {
                    if (err) {
                        throw new Error(err.message);
                    }
                    if (data) {
                        console.log('s3 upload data', data);

                        const url = data.Location;
                        // save URL in database
                        let result = await db.query(`
                            UPDATE users
                            SET image='${url}'
                            WHERE userId=${id} 
                        `);
                        if (result.error) throw new Error(result.error);
                        return res.send(200).json({
                            status: 'success',
                            url,
                        });
                    }
                });
            });
        };

        // DELETE: delete profile image from DO Spaces
        // Can call this after user uploads new profile picture
        if (method === 'DELETE') {
            // create S3 instance with credentials
            const s3 = new AWS.S3({
                endpoint: new AWS.Endpoint('nyc3.digitaloceanspaces.com'),
                accessKeyId: process.env.SPACES_KEY,
                secretAccessKey: process.env.SPACES_SECRET,
                region: 'nyc3',
            });
            const params = {
                Bucket: process.env.SPACES_BUCKET,
                Key: key,
            };
            s3.deleteObject(params, (err, data) => {
                if (err) {
                    throw new Error(err.message);
                }
                if (data) {
                    return res.json({
                        status: 'success',
                    });
                }
            });
        }

    } catch(e) {
        console.log('error in image.ts: ', e.message);
        return res.status(500).send({
            status: 'error',
            message: e.message,
        });
    }
};
