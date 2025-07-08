import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const GEOCODING_BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
const API_KEY = process.env.REVERSE_GEOCODING_API_KEY;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    if (!lat || !lon) {
      return NextResponse.json(
        { error: '위도(lat)와 경도(lon) 파라미터가 필요합니다.' },
        { status: 400 },
      );
    }

    if (!API_KEY) {
      return NextResponse.json(
        { error: 'Geocoding API 키가 설정되지 않았습니다.' },
        { status: 500 },
      );
    }

    const response = await axios.get(GEOCODING_BASE_URL, {
      params: {
        latlng: `${lat},${lon}`,
        key: API_KEY,
        language: 'ko',
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message =
        error.response?.data?.error_message ||
        '역지오코딩 정보를 가져오는 중 오류가 발생했습니다.';

      return NextResponse.json({ error: message }, { status });
    }

    return NextResponse.json(
      { error: '서버 내부 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
