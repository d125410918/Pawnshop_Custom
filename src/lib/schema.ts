import { z } from 'zod';

export const applicationSchema = z.object({
  name: z.string().min(1, '姓名為必填'),
  birthday: z.string().min(1, '出生年月日為必填').refine((date) => {
    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1 >= 18;
    }
    return age >= 18;
  }, '必須年滿18歲'),
  phone: z.string().min(1, '手機號碼為必填').regex(/^09\d{8}$/, '手機號碼格式錯誤'),
  lineId: z.string().optional(),
  housingType: z.enum(['自有', '租屋', '與家人同住'], {
    required_error: '請選擇居住狀況',
  }),
  jobType: z.enum(['正職', '兼職', '自營', '接案', '其他'], {
    required_error: '請選擇工作類型',
  }),
  jobYears: z.string().min(1, '年資為必填'),
  salary: z.string().min(1, '月收入為必填'),
  loanAmount: z.string().min(1, '需求金額為必填'),
  loanPurpose: z.enum(['周轉', '車輛', '醫療', '裝修', '其他'], {
    required_error: '請選擇用途',
  }),
  debts: z.array(z.enum(['信貸', '車貸', '融資', '無'])).min(1, '請選擇負債狀況'),
  confirmData: z.boolean().refine(val => val === true, '請確認資料正確'),
  agreeTerms: z.boolean().refine(val => val === true, '請同意資料審核使用'),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;