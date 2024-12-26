import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        if (password !== user.password) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        const token = jwt.sign({ id: user.user_id, role: user.role, username: user.username }, 'abdsjldknwifnsafns', {
            expiresIn: '1d',
        });

        return NextResponse.json({ token, role: user.role }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}


// GET - Retrieve all users
export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
