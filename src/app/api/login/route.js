import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);
    formData.append('grant_type', 'password');
    formData.append('scope', '');
    formData.append('client_id', '');
    formData.append('client_secret', '');

    const response = await axios.post(
      `${process.env.BACKEND_URL}/auth/login`,
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    const { access_token } = response.data;
    cookies().set('access_token', access_token, {
      maxAge: 3600,
      path: '/',
    });
    return NextResponse.json({ success: true });

  } catch (err) {

    return NextResponse.json(
      {
        success: false,
        message: err.response?.data || 'Unexpected error',
      },
      { status: err.response?.status || 500 }
    );
  }
}
