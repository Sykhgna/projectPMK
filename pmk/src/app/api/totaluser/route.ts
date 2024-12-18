import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    // Count the total number of users in the database
    const totalUsers = await prisma.user.count();
  
    // Return the result in the response
    return new Response(JSON.stringify({ totalUsers }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error('Error fetching total users:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
