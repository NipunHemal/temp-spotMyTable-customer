import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  const frontend_url = process.env.FRONTEND_URL;

  try {
    const body = await req.json();
    const amount = body.amount;
    const restaurantId = body.restaurantId;

    const reservationData = body.reservationData;
    const reference = `PAYTX${Date.now()}`; // Generate a unique reference ID

    reservationData.reference = reference;

    const serializedReservationData = new URLSearchParams(
      reservationData,
    ).toString();

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const appId = 'F77T118E68D8B41CC8DB4';
    // const token = '1d49b2a551693518dec18ceaa94aef1afabc5e10ab7f307ee3';
    const token =
      '1d49b2a551693518dec18ceaa94aef1afabc5e10ab7f307ee3c476c92f879110581f49ab583d047a.2WCU118E68D8B41CC8DEE';
    const hashSalt = '5O2H118E68D8B41CC8DDB';

    const requestBody = {
      amount: amount,
      // app_id: 'F77T118E68D8B41CC8DB4', // Replace with your actual app ID
      app_id: appId,
      reference: reference,
      // customer_first_name: body.customer_first_name || 'Default Name', // Replace with actual customer details
      customer_first_name: 'Default Name', // Replace with actual customer details
      // customer_last_name: body.customer_last_name || 'Default Name',
      customer_last_name: 'Default Name',
      // customer_phone_number: body.customer_phone_number || 'Default Phone',
      customer_phone_number: 'Default Phone',
      // customer_email: body.customer_email || 'Default Email',
      customer_email: 'DefaultEmail@gmail.com',
      // transaction_redirect_url: `${frontend_url}/payment-success?reference=${reference}`, // Replace with your success page
      transaction_redirect_url: `${frontend_url}/sn/${restaurantId}?paymentStatus=success&restaurantId=${restaurantId}&reference=${reference}`,
      currency: 'LKR',
      // additional_data: JSON.stringify({ reference }) // Include additional data if needed
      additional_data: serializedReservationData,
    };

    // const hashSalt = '5O2H118E68D8B41CC8DDB'; // Replace with your actual hash salt
    const bodyString =
      JSON.stringify(requestBody).replace(/\s+/g, '') + hashSalt;

    const hash = crypto.createHash('sha256').update(bodyString).digest('hex');

    // const token = '1d49b2a551693518dec18ceaa94aef1afabc5e10ab7f307ee3c476c92f879110581f49ab583d047a.2WCU118E68D8B41CC8DEE'; // Replace with your API token

    const response = await fetch(
      `https://merchant-api-live-v2.onepay.lk/api/ipg/gateway/request-payment-link/?hash=${hash}`,
      {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      },
    );

    const data = await response.json();

    if (data.status === 1000) {
      return NextResponse.json({
        redirect_url: data.data.gateway.redirect_url,
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to generate payment link' },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error('Error processing payment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
