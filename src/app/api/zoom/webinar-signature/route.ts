import { NextRequest, NextResponse } from 'next/server';
import { KJUR } from 'jsrsasign';

export async function POST(request: NextRequest) {
  try {
    const { meetingNumber, role = 0 } = await request.json();

    if (!meetingNumber) {
      return NextResponse.json(
        { error: 'Meeting number is required' },
        { status: 400 }
      );
    }

    // Get environment variables
    const sdkKey = process.env.ZOOM_MEETING_SDK_KEY || process.env.ZOOM_SDK_KEY;
    const sdkSecret = process.env.ZOOM_MEETING_SDK_SECRET || process.env.ZOOM_SDK_SECRET;

    if (!sdkKey || !sdkSecret) {
      console.error('Missing Zoom SDK credentials');
      return NextResponse.json(
        { error: 'Zoom SDK credentials not configured' },
        { status: 500 }
      );
    }

    // Generate JWT signature
    const iat = Math.round(new Date().getTime() / 1000) - 30;
    const exp = iat + 60 * 60 * 2; // 2 hours

    const oHeader = { alg: 'HS256', typ: 'JWT' };
    const oPayload = {
      iss: sdkKey,
      exp: exp,
      iat: iat,
      aud: 'zoom',
      appKey: sdkKey,
      tokenExp: exp,
      alg: 'HS256'
    };

    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);
    const signature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, sdkSecret);

    return NextResponse.json({
      signature,
      sdkKey,
      meetingNumber,
      role
    });

  } catch (error) {
    console.error('Error generating signature:', error);
    return NextResponse.json(
      { error: 'Failed to generate signature' },
      { status: 500 }
    );
  }
}
