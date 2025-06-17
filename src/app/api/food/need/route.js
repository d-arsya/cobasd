import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';
export async function GET() {
    try {
        const response = await axios.get(`${process.env.BACKEND_URL}/food/need`)
        const data = await response.data
        return NextResponse.json({ data });

    } catch (err) {
        return NextResponse.json(
            {
                success: false,
                message: err || 'Unexpected error',
            },
            { status: err.response?.status || 500 }
        );
    }
}