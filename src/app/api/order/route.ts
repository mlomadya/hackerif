
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // إرسال الطلب عبر EmailJS API مباشرة (بدون حزمة npm)
    // استبدل القيم أدناه بقيم حسابك في EmailJS
    const EMAILJS_SERVICE_ID = 'service_qjkst1l';
    const EMAILJS_TEMPLATE_ID = 'eszb_AhmVQwVk6L1kvHna';
    const EMAILJS_USER_ID = 'H4iDCEaokbieZgIte';

    const emailRes = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_USER_ID,
        template_params: {
          ...data // أرسل جميع بيانات الطلب أو حدد الحقول المطلوبة فقط
        }
      })
    });


    if (!emailRes.ok) {
      const errorText = await emailRes.text();
      return NextResponse.json({ success: false, error: 'فشل إرسال البريد', details: errorText }, { status: 400 });
    }

    return NextResponse.json({ success: true, order: data });
  } catch {
    return NextResponse.json({ success: false, error: 'خطأ في معالجة الطلب' }, { status: 400 });
  }
}
