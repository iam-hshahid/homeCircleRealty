import { NextRequest, NextResponse } from 'next/server';
import { getInquiries, addInquiry, updateInquiryStatus } from '@/lib/dataStore';

export async function GET() {
  try {
    const inquiries = getInquiries();
    return NextResponse.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.name || !body.phone) {
      return NextResponse.json(
        { success: false, error: 'Name and Phone Number are required.' },
        { status: 400 }
      );
    }

    const newInquiry = addInquiry({
      name: body.name,
      phone: body.phone,
      email: body.email || '',
      propertyId: body.propertyId,
      propertyTitle: body.propertyTitle,
      inquiryType: body.inquiryType || 'Site Visit',
      preferredDate: body.preferredDate || '',
      budget: body.budget || '',
      message: body.message || 'Customer requested a callback/site visit.'
    });

    return NextResponse.json({ success: true, data: newInquiry }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.id || !body.status) {
      return NextResponse.json({ success: false, error: 'ID and Status are required' }, { status: 400 });
    }
    const updated = updateInquiryStatus(body.id, body.status);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Inquiry not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
