
export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="max-w-2xl mx-auto px-6 py-12">

        <h1 className="text-4xl font-bold mb-4">
          快速資金申請
        </h1>

        <p className="text-gray-600 mb-10">
          簡單填寫資料，專人與您聯繫
        </p>

        <form className="space-y-6">

          <div>
            <label className="block mb-2">姓名</label>
            <input
              type="text"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2">出生年月日</label>
            <input
              type="date"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2">手機號碼</label>
            <input
              type="tel"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2">LINE ID（選填）</label>
            <input
              type="text"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2">居住狀況</label>

            <div className="space-y-2">
              <label className="flex gap-2">
                <input type="radio" name="housing" />
                自有
              </label>

              <label className="flex gap-2">
                <input type="radio" name="housing" />
                租屋
              </label>

              <label className="flex gap-2">
                <input type="radio" name="housing" />
                家人
              </label>
            </div>
          </div>

          <div>
            <label className="block mb-2">工作類型</label>

            <select className="w-full border rounded-lg p-3">
              <option>正職</option>
              <option>兼職</option>
              <option>自營</option>
              <option>接案</option>
              <option>其他</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">年資</label>
            <input
              type="text"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2">月收入</label>
            <input
              type="number"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2">需求金額</label>
            <input
              type="number"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2">用途</label>

            <select className="w-full border rounded-lg p-3">
              <option>周轉</option>
              <option>車輛</option>
              <option>醫療</option>
              <option>裝修</option>
              <option>其他</option>
            </select>
          </div>

          <div className="flex gap-2">
            <input type="checkbox" />
            <span>我確認資料正確並同意審核使用</span>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white rounded-lg py-4"
          >
            立即送出
          </button>

        </form>

      </section>
    </main>
  );
}
