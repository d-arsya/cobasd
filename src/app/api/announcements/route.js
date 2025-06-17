import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function GET() {
    try {
        const cookie = await cookies();
        const token = await cookie.get('access_token').value;
        const response = await axios.get(`${process.env.BACKEND_URL}/announcements`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const data = await response.data
        return NextResponse.json({ success: true, data });

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
export async function POST(req) {
    try {
        // const cookie = await cookies();
        // const token = await cookie.get('access_token').value;
        const { title, description } = await req.json();
        const response = await axios.post(`${process.env.BACKEND_URL}/announcements`, { title, description })
        // const response = await axios.post(`${process.env.BACKEND_URL}/announcements`, { title, description }, {
        //     headers: {
        //         Authorization: `Bearer ${token}`
        //     }
        // })
        return NextResponse.json({ success: true });

    } catch (err) {
        console.log(err)
        return NextResponse.json(
            {
                success: false,
                message: err || 'Unexpected error',
            },
            { status: err.response?.status || 500 }
        );
    }
}
