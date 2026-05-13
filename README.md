# 快速資金申請網站

一個一頁式資金申請網站，使用 Next.js、TypeScript 和 Tailwind CSS 開發。

## 功能特色

- **一頁式設計**：簡潔的單頁申請流程
- **年齡驗證**：自動檢查申請人是否年滿18歲
- **響應式設計**：支援手機和桌面端
- **表單驗證**：使用 Zod 進行資料驗證
- **管理後台**：簡單的案件管理介面

## 技術棧

- **前端**：Next.js 16, TypeScript, Tailwind CSS
- **表單**：React Hook Form, Zod
- **後台**：Next.js API Routes（臨時），建議改用 ASP.NET Core API + PostgreSQL

## 本地開發

1. 安裝依賴：
```bash
npm install
```

2. 啟動開發服務器：
```bash
npm run dev
```

3. 開啟瀏覽器訪問 [http://localhost:3000](http://localhost:3000)

## 管理後台

訪問 [http://localhost:3000/admin](http://localhost:3000/admin) 查看申請案件。

## 部署

建議部署到 Vercel：

```bash
npm run build
```

## 資料庫遷移

實際部署時，需要設置 PostgreSQL 資料庫並修改 API 路由以連接到資料庫。

資料庫表結構：
```sql
CREATE TABLE loan_cases (
  id SERIAL PRIMARY KEY,
  case_no VARCHAR(50) UNIQUE,
  name VARCHAR(100),
  birthday DATE,
  phone VARCHAR(20),
  line_id VARCHAR(100),
  housing_type VARCHAR(50),
  job_type VARCHAR(50),
  job_years VARCHAR(50),
  salary VARCHAR(50),
  loan_amount VARCHAR(50),
  loan_purpose VARCHAR(50),
  debts JSONB,
  status VARCHAR(50) DEFAULT '待聯絡',
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
