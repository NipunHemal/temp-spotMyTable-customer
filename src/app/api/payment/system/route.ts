import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    // Log something when the route is accessed
    console.log('API /payment/system called');
    
    // You can also log request headers or query parameters if needed
    console.log('Request Headers:', req.headers);

    // Respond with a simple JSON object
    return NextResponse.json({ message: 'System API route hit successfully!' });
  } catch (error) {
    console.error('Error in /payment/system:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
