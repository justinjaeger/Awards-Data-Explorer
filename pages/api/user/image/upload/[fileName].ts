import fs from 'fs';
import AWS from 'aws-sdk';
import formidable from 'formidable-serverless';
import sharp from 'sharp';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { IApiResponse } from '../../../../../types';
import prisma from '../../../../../lib/prisma';

export const config = {
    // idk if this shit is going to give me hell
    api: {
        bodyParser: false,
    },
};

export interface IUploadProfileImage extends IApiResponse {
    image?: string;
}

/**
 * Note: We pass formData into the body
 * because form.parse needs it to deconstruct
 */

export default async (
    req: NextApiRequest,
    res: NextApiResponse<IUploadProfileImage>
) => {
    const { method, query } = req;
    const key = query.fileName as string;

    const session = await getSession({ req });
    if (!session) {
        return res.status(401).send({
            status: 'error',
            message: 'User not authenticated',
        });
    }
    const username = session.user.username;

    try {
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

            return form.parse(req, async (err, fields, files) => {
                // Account for parsing errors
                if (err) throw new Error(err);

                // Convert to binary string / Buffer type
                const file = fs.readFileSync(files.file.path);

                console.log('BUFFER FILE', file);

                // Downsize the image
                const buffer = await sharp(file).resize(200, 200).toBuffer();

                const params = {
                    Bucket: process.env.SPACES_BUCKET,
                    ACL: 'public-read',
                    Key: `ProfileImages/${key}`,
                    Body: buffer,
                    ContentType: 'image/jpeg',
                };

                // Upload and send the file
                return await s3.upload(params).send(async (err, data) => {
                    if (err) {
                        throw new Error(err.message);
                    }
                    if (data) {
                        console.log('S3 UPLOAD DATA', data);

                        // This is the url of our image so https://.....jpg
                        const url = data.Location;

                        // convert to edge url
                        const edgeUrl = `${url.slice(0, 24)}.cdn${url.slice(
                            24
                        )}`;

                        console.log('EDGE URL', edgeUrl);

                        await prisma.user.update({
                            where: {
                                username,
                            },
                            data: {
                                image: edgeUrl,
                            },
                        });
                        return res.status(200).json({
                            status: 'success',
                            image: edgeUrl,
                        });
                    }
                });
            });
        }
        throw new Error();
    } catch (e) {
        console.error(e);
        return res.status(500).send({
            status: 'error',
            message: 'An error has occurred',
        });
    }
};
