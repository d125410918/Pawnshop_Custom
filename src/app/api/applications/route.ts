import { NextRequest, NextResponse } from 'next/server';
import { applicationSchema } from '@/lib/schema';

// 臨時存儲，實際應該用資料庫
let applications: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 驗證資料
    const validatedData = applicationSchema.parse(body);

    // 生成案件編號
    const caseNo = `APP${Date.now()}`;

    // 儲存申請
    const application = {
      id: Date.now().toString(),
      caseNo,
      ...validatedData,
      status: '待聯絡',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    applications.push(application);

    return NextResponse.json({
      success: true,
      caseNo,
      message: '申請已提交成功'
    });
  } catch (error) {
    console.error('Application submission error:', error);
    return NextResponse.json(
      { success: false, message: '提交失敗，請檢查資料' },
      { status: 400 }
    );
  }
}

export async function GET() {
  // 簡單的列表 API，實際應該有認證
  return NextResponse.json(applications);
}