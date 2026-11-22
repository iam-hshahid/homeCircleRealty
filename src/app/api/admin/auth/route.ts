import { NextRequest, NextResponse } from 'next/server';
import { 
  checkPassword, 
  generateResetCode, 
  verifyResetCodeAndChangePassword, 
  getCompanyEmail 
} from '@/lib/authStore';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    // 1. LOGIN
    if (action === 'login') {
      const { password } = body;
      if (!password) {
        return NextResponse.json({ success: false, error: 'Password is required' }, { status: 400 });
      }

      const isValid = checkPassword(password);
      if (!isValid) {
        return NextResponse.json({ success: false, error: 'Incorrect admin password' }, { status: 401 });
      }

      // Generate simple session token
      const sessionToken = Buffer.from(`admin_auth_${Date.now()}`).toString('base64');
      return NextResponse.json({ 
        success: true, 
        message: 'Authentication successful',
        token: sessionToken 
      });
    }

    // 2. REQUEST RESET CODE (Sent to info@homecirclerealty.in)
    if (action === 'request-reset') {
      const resetInfo = generateResetCode();

      // Log dispatch for server records / simulation
      console.log(`[PASSWORD RESET] 6-digit code for ${resetInfo.email} is: ${resetInfo.code}`);

      return NextResponse.json({
        success: true,
        message: `A 6-digit verification code has been dispatched to ${resetInfo.email}`,
        email: resetInfo.email,
        // Included for demo & immediate development testing so the admin can test immediately
        demoCode: resetInfo.code,
        expiresInMinutes: 15
      });
    }

    // 3. VERIFY RESET CODE AND UPDATE PASSWORD
    if (action === 'verify-reset') {
      const { code, newPassword } = body;
      if (!code || !newPassword) {
        return NextResponse.json({ success: false, error: 'Verification code and new password are required' }, { status: 400 });
      }

      const result = verifyResetCodeAndChangePassword(code, newPassword);
      if (!result.success) {
        return NextResponse.json({ success: false, error: result.error }, { status: 400 });
      }

      const sessionToken = Buffer.from(`admin_auth_${Date.now()}`).toString('base64');
      return NextResponse.json({
        success: true,
        message: 'Password successfully updated',
        token: sessionToken
      });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    companyEmail: getCompanyEmail(),
    status: 'auth_service_online'
  });
}
