import { NextResponse } from 'next/server';
import { PrismaClient, User } from '@prisma/client'; // Ensure User is imported here


const prisma = new PrismaClient();

// Handler for GET and POST requests
export async function GET() {
    try {
        const users: User[] = await prisma.user.findMany(); // Explicitly type the response
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const { username, password, role, full_name, email } = await request.json();

    try {
        const newUser = await prisma.user.create({
            data: { username, password, role, full_name, email },
        });
        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
    }
}

