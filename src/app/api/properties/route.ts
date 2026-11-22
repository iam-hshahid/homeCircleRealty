import { NextRequest, NextResponse } from 'next/server';
import { getProperties, addProperty } from '@/lib/dataStore';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    let properties = getProperties();

    const type = searchParams.get('type');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const bedrooms = searchParams.get('bedrooms');
    const location = searchParams.get('location');
    const status = searchParams.get('status');
    const featured = searchParams.get('featured');
    const query = searchParams.get('q');

    if (type && type !== 'All') {
      properties = properties.filter(p => p.type.toLowerCase() === type.toLowerCase());
    }

    if (minPrice) {
      properties = properties.filter(p => p.numericPrice >= Number(minPrice));
    }

    if (maxPrice) {
      properties = properties.filter(p => p.numericPrice <= Number(maxPrice));
    }

    if (bedrooms && bedrooms !== 'All') {
      const bhk = parseInt(bedrooms);
      if (bedrooms.includes('5')) {
        properties = properties.filter(p => p.bedrooms >= 5);
      } else {
        properties = properties.filter(p => p.bedrooms === bhk);
      }
    }

    if (location && location !== 'All') {
      properties = properties.filter(p => 
        p.location.toLowerCase().includes(location.toLowerCase()) || 
        p.area.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (status && status !== 'All') {
      properties = properties.filter(p => p.possessionStatus.toLowerCase() === status.toLowerCase());
    }

    if (featured === 'true') {
      properties = properties.filter(p => p.featured);
    }

    if (query) {
      const q = query.toLowerCase();
      properties = properties.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q) ||
        p.developer.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({ success: true, count: properties.length, data: properties });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || !body.price || !body.location || !body.type) {
      return NextResponse.json(
        { success: false, error: 'Title, Price, Location, and Property Type are required.' },
        { status: 400 }
      );
    }

    // Process YouTube link if user entered a full YouTube URL
    let ytId = body.youtubeId || '';
    if (body.youtubeUrl && !ytId) {
      const match = body.youtubeUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
      if (match && match[1]) {
        ytId = match[1];
      }
    }

    const newProperty = addProperty({
      title: body.title,
      slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      tagline: body.tagline || `${body.bedrooms || ''} BHK Luxury ${body.type} in ${body.location}`,
      developer: body.developer || 'Home Circle Verified Builder',
      type: body.type,
      price: body.price,
      numericPrice: Number(body.numericPrice) || 0,
      pricePerSqFt: body.pricePerSqFt || '',
      location: body.location,
      area: body.area || body.location,
      city: body.city || 'Bengaluru',
      pincode: body.pincode || '560001',
      bedrooms: Number(body.bedrooms) || 0,
      bathrooms: Number(body.bathrooms) || 0,
      balconies: Number(body.balconies) || 0,
      superBuiltUpArea: Number(body.superBuiltUpArea) || 0,
      carpetArea: Number(body.carpetArea) || 0,
      furnishing: body.furnishing || 'Semi-Furnished',
      facing: body.facing || 'East',
      possessionStatus: body.possessionStatus || 'Ready to Move',
      possessionDate: body.possessionDate || 'Immediate',
      reraNumber: body.reraNumber || 'PRM/KA/RERA/PENDING',
      youtubeId: ytId || 'UCVspkQelHEryqK4QKMHATug',
      youtubeUrl: body.youtubeUrl || 'https://www.youtube.com/channel/UCVspkQelHEryqK4QKMHATug',
      featured: Boolean(body.featured),
      images: Array.isArray(body.images) && body.images.length > 0 ? body.images : [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80'
      ],
      description: body.description || '',
      highlights: Array.isArray(body.highlights) ? body.highlights : (body.highlights ? body.highlights.split('\n').filter(Boolean) : []),
      amenities: Array.isArray(body.amenities) ? body.amenities : (body.amenities ? body.amenities.split(',').map((s: string) => s.trim()).filter(Boolean) : [])
    });

    return NextResponse.json({ success: true, data: newProperty }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
