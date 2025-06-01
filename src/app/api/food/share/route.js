import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';
export async function GET() {
    try {
        const cookie = await cookies();
        const token = await cookie.get('access_token').value;
        const response = await axios.get(`${process.env.BACKEND_URL}/food/share`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
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