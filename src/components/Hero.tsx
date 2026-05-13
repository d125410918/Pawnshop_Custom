export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          快速申請資金方案
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          簡單填寫資料，專人與您聯繫
        </p>
        <button
          onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          開始申請
        </button>
      </div>
    </section>
  );
}