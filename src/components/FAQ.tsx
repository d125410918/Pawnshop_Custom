'use client';

import { useState } from 'react';

const faqs = [
  {
    question: '申請需要準備什麼文件？',
    answer: '只需填寫線上表單即可，無需上傳任何證件或文件。',
  },
  {
    question: '多久會收到回覆？',
    answer: '我們會在1個工作天內由專人聯繫您。',
  },
  {
    question: '申請是否會影響信用？',
    answer: '僅為初步諮詢，不會影響您的信用記錄。',
  },
  {
    question: '最低申請金額是多少？',
    answer: '視個人狀況而定，請填寫表單後由專員為您說明。',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">常見問題</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
              >
                <span className="font-medium">{faq.question}</span>
                <span className="text-gray-400">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}