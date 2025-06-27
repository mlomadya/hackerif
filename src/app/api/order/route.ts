import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // هنا يمكنك حفظ الطلب في قاعدة بيانات أو إرساله لبريد إلكتروني
    // الآن فقط نعيد البيانات كاختبار
    return NextResponse.json({ success: true, order: data });
  } catch (e) {
    return NextResponse.json({ success: false, error: 'خطأ في معالجة الطلب' }, { status: 400 });
  }
}
