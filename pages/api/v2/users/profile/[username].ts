import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';
import { IApiResponse } from '../../../../../types';

interface IProfileUserResponse extends IApiResponse {
    id?: number;
    image?: string;
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<IProfileUserResponse>
) => {
    const {
        method,
        query: { username },
    } = req;

    /**
     * An "unprotected" route for getting data on other users
     */

    try {
        /**
         * Check that a user with this name exists...
         * if not, throw a 404 page
         */
        if (method === 'GET') {
            const user = await prisma.user.findUnique({
                // typing here should be User | null I think?
                where: {
                    username: username as string,
                },
            });
            if (user === null)
                return res.json({
                    status: 'rejected',
                    message: '404',
                });
            const { id, image } = user; // wonder if I can deconstruct oon the call. But if it comes back null it might throow an error
            return res.status(200).json({
                status: 'success',
                id,
                image,
            });
        }
    } catch (e) {
        console.log('error: ', e.code, e.message);
        return res.status(500).json({
            status: 'error',
            message: e.message,
        });
    }
};
