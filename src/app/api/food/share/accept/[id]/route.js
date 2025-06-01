import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';
export async function POST(req, { params }) {
    try {
        const id = params.id;
        await axios.post(`${process.env.BACKEND_URL}/food/share/accept/${id}`)
        // console.log(response);
        return NextResponse.json({ success: true });

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
