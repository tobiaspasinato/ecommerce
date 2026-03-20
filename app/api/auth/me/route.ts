import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function GET(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
    if (!process.env.JWT_SECRET) {
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return NextResponse.json({ message: 'Acceso permitido', user: decoded });
    } catch (error) {
        console.error('Error en Login:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}