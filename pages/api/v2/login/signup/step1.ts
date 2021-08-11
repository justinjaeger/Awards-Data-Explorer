import prisma from '../../../../../lib/prisma';
import { createVerificationCodeEmail } from '../../../../../utils/mailHelper';
import { IApiResponse } from '../../../../../types';
import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';


/**
 * User submits email and gets a confirmation link sent to them
 */

export default async (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => {

    const {
        method,
        body: { email },
    } = req;
    
    try {
        // POST: signup / create new user
        if (method === 'POST') {

            // Check that email is properly formatted
            if (!email.includes('@') || !email.includes('.')) {
                return res.json({
                    status: 'rejected',
                    message: 'This email is not properly formatted.'
                });
            }

            // Create new user in database
            const { id } = await prisma.user.create({
                data: {
                    email,
                },
                select: {
                    id: true,
                }
            });

            // Generate verification code
            const verificationCode = Math.floor(100000 + Math.random() * 900000);

            // Utilize the helper function to create e-mail
            // Creates the link to send them to signup/:code
            const { transport, options } = createVerificationCodeEmail(email, verificationCode);

            // Actually sends the email
            const emailRes = transport.sendMail(options);
            if (emailRes.error) throw new Error(emailRes.error);

            // Get expiration time (now + 30 minutes)
            const dt = new Date();
            dt.setMinutes( dt.getMinutes() + 30 );
            const expiration = dt.toISOString().slice(0, 19).replace("T", " ");

            // Sets verification code in database
            await prisma.code.create({
                data: {
                    code: verificationCode,
                    userId: id,
                    expiration,
                },
            });

            return res.status(200).json({ 
                status: 'success',
            });
        };

    } catch(e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                return res.json({
                    status: 'rejected',
                    message: 'This email is already registered.'
                });
            }
        }
        console.log('error in step1.ts: ', e.code, e.message);
        return res.status(500).json({
            status: 'error',
            message: e.message,
        });
    }
};
