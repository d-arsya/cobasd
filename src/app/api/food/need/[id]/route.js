import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';
export async function DELETE(req, { params }) {
    try {
        const id = params.id;
        await axios.delete(`${process.env.BACKEND_URL}/food/need/${id}`)
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
