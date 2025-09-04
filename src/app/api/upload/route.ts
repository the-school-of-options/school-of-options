import axios from 'axios';
import { NextRequest } from 'next/server';

// const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
// const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_STREAM_API_TOKEN;

const CLOUDFLARE_ACCOUNT_ID = 'b5363f7e371d20a49d2ca4a628f4fddf'
const CLOUDFLARE_API_TOKEN = '4GlvICD-dA70l53Lx9fNn2RGuCZYsrnSfakNMB9Z';

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming form data
    const formData = await req.formData();
    const file = formData.get('file');
    
    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const uploadForm = new FormData();
    uploadForm.append('file', file);

    const CLOUDFLARE_STREAM_URL = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/stream`;

    const response = await axios.post(CLOUDFLARE_STREAM_URL, uploadForm, {
      headers: {
        'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return new Response(JSON.stringify(response.data), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Upload failed' 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
