import AWS from 'aws-sdk';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { IApiResponse } from '../../../../types';

export type IDeleteProfileImage = IApiResponse;

/**
 * Note: We pass formData into the body
 * because form.parse needs it to deconstruct
 */

export default async (
    req: NextApiRequest,
    res: NextApiResponse<IDeleteProfileImage>
) => {
    const { method, body } = req;
    const key = body.fileName as string;

    const session = await getSession({ req });
    if (!session) {
        return res.status(401).send({
            status: 'error',
            message: 'User not authenticated',
        });
    }

    try {
        if (method === 'POST') {
            console.log('deleting image with key: ', key);
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
            return s3.deleteObject(params, (err, data) => {
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
        throw new Error();
    } catch (e) {
        console.error(e);
        return res.status(500).send({
            status: 'error',
            message: 'An error has occurred',
        });
    }
};
