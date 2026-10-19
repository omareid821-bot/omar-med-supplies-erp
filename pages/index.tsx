import Head from 'next/head'
import useSWR from 'swr'

const fetcher = (url:string)=> fetch(url).then(r=>r.json())

export default function Home(){
  const {data} = useSWR('/api/seed', fetcher)
  const demo = data || {}

  return (
    <div className="min-h-screen bg-gray-50 p-4" dir="rtl">
      <Head>
        <title>لوحة التحكم - نظام المستلزمات الطبية</title>
      </Head>

      <header className="mb-6">
        <h1 className="text-2xl font-bold">لوحة التحكم الذكية</h1>
        <p className="text-sm text-gray-600">مرحباً بك، هذه نسخة مبدئية للوحة التحكم باللغة العربية</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">إجمالي المبيعات (ر.س)</div>
          <div className="text-2xl font-semibold">{demo.invoices ? demo.invoices.reduce((s:any,i:any)=>s+i.total,0) : '—'}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">إجمالي التحصيلات (ر.س)</div>
          <div className="text-2xl font-semibold">{demo.payments ? demo.payments.reduce((s:any,p:any)=>s+p.amount,0) : '—'}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">إجمالي المديونيات المستحقة</div>
          <div className="text-2xl font-semibold">{ demo.clients ? demo.clients.reduce((s:any,c:any)=>s+(c.opening_balance||0),0) : '—' }</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">الأرباح (تقديري)</div>
          <div className="text-2xl font-semibold">—</div>
        </div>
      </section>

      <section className="mb-6">
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-green-600 text-white rounded">+ عرض سعر جديد</button>
          <button className="px-3 py-2 bg-blue-600 text-white rounded">+ فاتورة جديدة</button>
          <button className="px-3 py-2 bg-yellow-500 text-white rounded">+ تسجيل دفعة</button>
          <button className="px-3 py-2 bg-indigo-600 text-white rounded">+ كشف حساب</button>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">تنبيهات</h2>
        <div className="bg-white p-4 rounded shadow">
          <ul className="list-disc pl-5 text-sm text-gray-700">
            <li>تنبيه: عميل "عيادة الأسنان الحديثة" عليه رصيد افتتاحي {demo.clients ? demo.clients[0].opening_balance : '—'} ر.س</li>
            <li>تنبيه: صنف "معجون أسنان إكلينيكي 100مل" قرب تاريخ انتهاء الصلاحية (محاكاة)</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
