import { PrismaClient } from '@prisma/client';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { parse } from 'cookie'; // Library untuk mem-parse cookies

const prisma = new PrismaClient();

// Secret key for JWT verification (ensure this matches the signing secret)
const JWT_SECRET = process.env.JWT_SECRET || 'abdsjldknwifnsafns';

export async function GET(req: Request) {
    try {
        // Get cookies from the request
        const cookieHeader = req.headers.get('cookie');

        if (!cookieHeader) {
            return new Response(
                JSON.stringify({ message: 'Authorization token missing in cookies' }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Parse the cookies
        const cookies = parse(cookieHeader);

        // Get the JWT token from the cookies (assuming the cookie is named 'jwt')
        const token = cookies.token;

        if (!token) {
            return new Response(
                JSON.stringify({ message: 'JWT token missing in cookies' }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Verify the token and decode it
        const decoded: any = jwt.verify(token, JWT_SECRET);
        console.log(decoded); // Untuk debugging memastikan userId ada di token

        // Get userId from the decoded token
        const userId = (decoded as JwtPayload).id;

        // Fetch user from the database using the extracted userId
        const user = await prisma.user.findUnique({
            where: { user_id: userId },
        });

        if (!user) {
            return new Response(
                JSON.stringify({ message: 'User not found' }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        return new Response(JSON.stringify(user), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ message: 'Internal Server Error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
