import { PrismaClient } from '@prisma/client';
import jwt, { JwtPayload } from 'jsonwebtoken';

const prisma = new PrismaClient();

// Secret key for JWT verification (ensure this is the same as used when signing the token)
const JWT_SECRET = process.env.JWT_SECRET || 'abdsjldknwifnsafns'; 

export async function GET(req: Request) {
    try {
        // Get the JWT token from the request headers (typically from Authorization header)
        const authHeader = req.headers.get('Authorization');
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return new Response(
                JSON.stringify({ message: 'Authorization token missing or invalid' }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const token = authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'

        // Verify the token and decode it
        const decoded: any = jwt.verify(token, JWT_SECRET);
        console.log(decoded); // Untuk memastikan ada userId di dalam token

        // Get userId from the decoded token (assuming userId is stored in the token)
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
