import fs from 'fs';
import AWS from 'aws-sdk';
import formidable from 'formidable-serverless';
import sharp from 'sharp';
import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';
import { IApiResponse, IUser } from '../../../types';
import prisma from '../../../lib/prisma';

export interface IUploadImageResponse extends IApiResponse {
    user?: IUser;
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<IUploadImageResponse>
) => {
    const { method, query } = req;
    const email = query.email as string;

    try {
        // GET: user
        if (method === 'GET') {
            const { id, username, image, role } = await prisma.user.findUnique({
                where: {
                    email,
                },
            });
            return {
                status: 'success',
                user: {
                    id,
                    username,
                    email,
                    role,
                    image,
                },
            };
        } else {
            throw new Error();
        }
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            console.log('Known prisma error. Code:', e.code);
        }
        return res.status(500).send({
            status: 'error',
            message: e.message,
        });
    }
};
