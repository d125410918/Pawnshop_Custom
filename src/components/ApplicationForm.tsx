'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { applicationSchema, ApplicationFormData, DebtOption, debtOptions } from '@/lib/schema';

export default function ApplicationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  });

  const onSubmit = async (data: ApplicationFormData) => {
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        alert(`申請已提交成功！案件編號：${result.caseNo}`);
        // 重置表單
        window.location.reload();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('提交失敗，請稍後再試');
    }
  };

  const debts = watch('debts') || [];

  const handleDebtChange = (debt: DebtOption, checked: boolean) => {
    if (debt === '無') {
      setValue('debts', checked ? ['無'] : []);
    } else {
      if (checked) {
        // 添加債務，移除'無'如果存在的話
        const newDebts = [...debts.filter(d => d !== '無' && d !== debt), debt];
        setValue('debts', newDebts);
      } else {
        // 移除債務
        const newDebts = debts.filter(d => d !== debt);
        setValue('debts', newDebts.length === 0 ? ['無'] : newDebts);
      }
    }
  };

  return (
    <section id="application-form" className="py-16 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8">資金申請表單</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* 基本資料 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">基本資料</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">姓名 *</label>
                  <input
                    {...register('name')}
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">出生年月日 *</label>
                  <input
                    {...register('birthday')}
                    type="date"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.birthday && <p className="mt-1 text-sm text-red-600">{errors.birthday.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">手機號碼 *</label>
                  <input
                    {...register('phone')}
                    type="tel"
                    placeholder="0912345678"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">LINE ID</label>
                  <input
                    {...register('lineId')}
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* 居住資料 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">居住狀況</h3>
              <div className="space-y-2">
                {['自有', '租屋', '與家人同住'].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      {...register('housingType')}
                      type="radio"
                      value={type}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2">{type}</span>
                  </label>
                ))}
              </div>
              {errors.housingType && <p className="mt-1 text-sm text-red-600">{errors.housingType.message}</p>}
            </div>

            {/* 工作資料 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">工作資料</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">工作類型 *</label>
                  <select
                    {...register('jobType')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">請選擇</option>
                    <option value="正職">正職</option>
                    <option value="兼職">兼職</option>
                    <option value="自營">自營</option>
                    <option value="接案">接案</option>
                    <option value="其他">其他</option>
                  </select>
                  {errors.jobType && <p className="mt-1 text-sm text-red-600">{errors.jobType.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">年資 *</label>
                  <input
                    {...register('jobYears')}
                    type="text"
                    placeholder="例如：3年"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.jobYears && <p className="mt-1 text-sm text-red-600">{errors.jobYears.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">月收入 *</label>
                  <input
                    {...register('salary')}
                    type="text"
                    placeholder="例如：50000"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.salary && <p className="mt-1 text-sm text-red-600">{errors.salary.message}</p>}
                </div>
              </div>
            </div>

            {/* 資金需求 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">資金需求</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">需求金額 *</label>
                  <input
                    {...register('loanAmount')}
                    type="text"
                    placeholder="例如：100000"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.loanAmount && <p className="mt-1 text-sm text-red-600">{errors.loanAmount.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">用途 *</label>
                  <select
                    {...register('loanPurpose')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">請選擇</option>
                    <option value="周轉">周轉</option>
                    <option value="車輛">車輛</option>
                    <option value="醫療">醫療</option>
                    <option value="裝修">裝修</option>
                    <option value="其他">其他</option>
                  </select>
                  {errors.loanPurpose && <p className="mt-1 text-sm text-red-600">{errors.loanPurpose.message}</p>}
                </div>
              </div>
            </div>

            {/* 負債簡況 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">目前負債</h3>
              <div className="space-y-2">
                {debtOptions.map((debt) => (
                  <label key={debt} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={debts.includes(debt)}
                      onChange={(e) => handleDebtChange(debt, e.target.checked)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2">{debt}</span>
                  </label>
                ))}
              </div>
              {errors.debts && <p className="mt-1 text-sm text-red-600">{errors.debts.message}</p>}
            </div>

            {/* 同意條款 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">確認與同意</h3>
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    {...register('confirmData')}
                    type="checkbox"
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2">我確認資料正確</span>
                </label>
                {errors.confirmData && <p className="mt-1 text-sm text-red-600">{errors.confirmData.message}</p>}
                <label className="flex items-center">
                  <input
                    {...register('agreeTerms')}
                    type="checkbox"
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2">同意資料審核使用</span>
                </label>
                {errors.agreeTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeTerms.message}</p>}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              立即送出
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}