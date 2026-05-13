'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';

const schema = z.object({
  name: z.string().min(1, '請填寫姓名'),
  birthday: z.string().min(1, '請填寫出生年月日'),
  phone: z.string().regex(/^09\d{8}$/, '請填寫正確手機號碼（09開頭共10碼）'),
  lineId: z.string().optional(),
  housingType: z.enum(['自有', '租屋', '與家人同住']),
  jobType: z.enum(['正職', '兼職', '自營', '接案', '其他']),
  jobYears: z.string().min(1, '請填寫年資'),
  salary: z.string().min(1, '請填寫月收入'),
  loanAmount: z.string().min(1, '請填寫需求金額'),
  loanPurpose: z.enum(['周轉', '車輛', '醫療', '裝修', '其他']),
  debts: z.array(z.string()),
  agree: z.literal(true, { errorMap: () => ({ message: '請同意資料審核使用' }) }),
});

type FormData = z.infer<typeof schema>;

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [ageError, setAgeError] = useState('');

  const { register, handleSubmit, formState: { errors }, reset, setError } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { debts: [] },
  });

  const calculateAge = (birthday: string): number => {
    const birth = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    if (today.getMonth() < birth.getMonth() || 
        (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const onSubmit = async (data: FormData) => {
    const age = calculateAge(data.birthday);
    
    if (age < 18) {
      setAgeError('未滿18歲無法申請，請確認出生日期');
      return;
    }
    
    setAgeError('');
    console.log('✅ 申請送出成功：', data);
    
    setSubmitted(true);
    reset();
    
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="text-3xl font-bold text-amber-600 tracking-wider">徠鑫當鋪</div>
          <div className="text-sm text-gray-500 font-medium">快速 • 安心 • 專人服務</div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">快速申請資金</h1>
          <p className="text-xl text-gray-600">填寫以下資料，專人將在最短時間內與您聯繫</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            {/* 基本資料 */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">基本資料</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">姓名 <span className="text-red-500">*</span></label>
                  <input {...register('name')} className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-amber-500" placeholder="請輸入姓名" />
                  {errors.name && <p className="text-red-500 text-sm mt-1.5">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">出生年月日 <span className="text-red-500">*</span></label>
                  <input type="date" {...register('birthday')} className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-amber-500" />
                  {errors.birthday && <p className="text-red-500 text-sm mt-1.5">{errors.birthday.message}</p>}
                  {ageError && <p className="text-red-500 text-sm mt-1.5">{ageError}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium mb-2">手機號碼 <span className="text-red-500">*</span></label>
                  <input {...register('phone')} className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-amber-500" placeholder="09xxxxxxxx" />
                  {errors.phone && <p className="text-red-500 text-sm mt-1.5">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">LINE ID（選填）</label>
                  <input {...register('lineId')} className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-amber-500" placeholder="@您的LINE ID" />
                </div>
              </div>
            </section>

            {/* 居住狀況 */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">居住狀況</h2>
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                {['自有', '租屋', '與家人同住'].map((type) => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" value={type} {...register('housingType')} className="w-5 h-5 accent-amber-600" />
                    <span className="text-lg">{type}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* 工作資料 */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">工作資料</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">工作類型 <span className="text-red-500">*</span></label>
                  <select {...register('jobType')} className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-amber-500">
                    <option value="">請選擇</option>
                    <option value="正職">正職</option>
                    <option value="兼職">兼職</option>
                    <option value="自營">自營</option>
                    <option value="接案">接案</option>
                    <option value="其他">其他</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">年資 <span className="text-red-500">*</span></label>
                  <input {...register('jobYears')} className="w-full border border-gray-300 rounded-2xl px-5 py-4" placeholder="例如：2年6個月" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">月收入 <span className="text-red-500">*</span></label>
                  <input {...register('salary')} type="number" className="w-full border border-gray-300 rounded-2xl px-5 py-4" placeholder="例如：45000" />
                </div>
              </div>
            </section>

            {/* 資金需求 */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">資金需求</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">需求金額 <span className="text-red-500">*</span></label>
                  <input type="number" {...register('loanAmount')} className="w-full border border-gray-300 rounded-2xl px-5 py-4" placeholder="輸入金額（元）" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">用途 <span className="text-red-500">*</span></label>
                  <select {...register('loanPurpose')} className="w-full border border-gray-300 rounded-2xl px-5 py-4">
                    <option value="">請選擇用途</option>
                    <option value="周轉">周轉</option>
                    <option value="車輛">車輛</option>
                    <option value="醫療">醫療</option>
                    <option value="裝修">裝修</option>
                    <option value="其他">其他</option>
                  </select>
                </div>
              </div>
            </section>

            {/* 負債 */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">目前負債</h2>
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                {['信貸', '車貸', '融資', '無'].map((item) => (
                  <label key={item} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" value={item} {...register('debts')} className="w-5 h-5 accent-amber-600" />
                    <span className="text-lg">{item}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* 同意 */}
            <div className="pt-6 border-t">
              <label className="flex gap-3 cursor-pointer">
                <input type="checkbox" {...register('agree')} className="w-5 h-5 mt-1 accent-amber-600" />
                <span className="text-sm leading-relaxed text-gray-600">
                  我確認以上資料正確無誤，並同意徠鑫當鋪使用這些資料進行審核與後續聯繫
                </span>
              </label>
              {errors.agree && <p className="text-red-500 text-sm mt-2">{errors.agree.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 transition py-5 rounded-2xl text-white text-xl font-semibold shadow-lg"
            >
              立即送出申請
            </button>
          </form>
        </div>

        {submitted && (
          <div className="mt-8 text-center bg-green-50 border border-green-300 text-green-700 py-6 rounded-2xl text-lg font-medium">
            🎉 申請已成功送出！<br />專人將盡速與您聯繫，請保持手機暢通。
          </div>
        )}
      </div>

      <footer className="bg-white py-8 text-center text-gray-500 text-sm border-t">
        © 2026 徠鑫當鋪 版權所有
      </footer>
    </div>
  );
}