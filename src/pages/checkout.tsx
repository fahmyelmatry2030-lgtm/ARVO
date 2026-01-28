import React, { useState, useMemo } from 'react';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/router';
import { createAndSaveOrder } from '../lib/orders'
import SafeImage from '../components/SafeImage';
import Link from 'next/link';
import { FiChevronRight, FiLock, FiCreditCard, FiTruck, FiMapPin, FiPhone, FiUser } from 'react-icons/fi';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

interface ShippingInfo {
  name: string;
  address: string;
  city: string;
  phone: string;
}

export default function Checkout() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: '',
    address: '',
    city: '',
    phone: ''
  });

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const FREE_SHIPPING_THRESHOLD = 500;
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 30;
  const tax = +(0.05 * subtotal).toFixed(0);
  const total = subtotal + shippingCost + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const order = createAndSaveOrder(cart, shippingInfo);
      if (clearCart) clearCart();
      router.push(`/thank-you?orderId=${order.id}`);
    } catch (err) {
      console.error('Error saving order', err);
      // Optional: Add toast error here
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
            {React.createElement(FiTruck as any, { className: "w-10 h-10 text-gray-200" })}
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter">حقيبتك فارغة تماماً</h1>
          <p className="text-gray-500 mb-8 max-w-md">يبدو أنك لم تضف أي قطع مميزة إلى حقيبتك بعد. استكشف كولكشن 2024 الآن.</p>
          <Link href="/products" className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-xl shadow-gray-900/10">
            ابدأ التسوق
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO title="إتمام الشراء" description="أكمل طلبك الآن من AROVA. شحن سريع ودفع آمن." />

      <div className="bg-gray-50 min-h-screen py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="mb-12 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-gray-400">
            <Link href="/products" className="hover:text-amber-600 transition-colors">المتجر</Link>
            {React.createElement(FiChevronRight as any)}
            <span className="text-gray-900">إتمام الشراء</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Forms */}
            <div className="lg:col-span-7 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12"
              >
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                    {React.createElement(FiMapPin as any, { className: "w-6 h-6" })}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter leading-none">عنوان التوصيل</h2>
                    <p className="text-gray-400 text-sm mt-1">أدخل تفاصيل المكان الذي تود استلام طلبك فيه</p>
                  </div>
                </div>

                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">الاسم الكامل</label>
                      <div className="relative group">
                        <input
                          type="text"
                          value={shippingInfo.name}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                          className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500/20 transition-all font-bold placeholder:text-gray-300"
                          placeholder="الاسم الثلاثي"
                          required
                        />
                        {React.createElement(FiUser as any, { className: "absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-amber-500 transition-colors" })}
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">رقم الجوال</label>
                      <div className="relative group">
                        <input
                          type="tel"
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                          className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500/20 transition-all font-bold placeholder:text-gray-300 text-left"
                          placeholder="05xxxxxxx"
                          dir="ltr"
                          required
                        />
                        {React.createElement(FiPhone as any, { className: "absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-amber-500 transition-colors" })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">المدينة</label>
                      <input
                        type="text"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500/20 transition-all font-bold placeholder:text-gray-300"
                        placeholder="الرياض"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">العنوان بالتفصيل</label>
                      <input
                        type="text"
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500/20 transition-all font-bold placeholder:text-gray-300"
                        placeholder="الحي، اسم الشارع، الطابق"
                        required
                      />
                    </div>
                  </div>
                </form>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 font-bold"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                    {React.createElement(FiCreditCard as any, { className: "w-6 h-6" })}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter leading-none">طريقة الدفع</h2>
                    <p className="text-gray-400 text-sm mt-1">اختر الوسيلة المناسبة لك لإتمام الطلب</p>
                  </div>
                </div>

                <div className="p-6 border-2 border-amber-500 bg-amber-50/50 rounded-2xl flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full border-2 border-amber-600 flex items-center justify-center">
                      <div className="w-3 h-3 bg-amber-600 rounded-full" />
                    </div>
                    <span className="text-gray-900 text-lg">الدفع عند الاستلام</span>
                  </div>
                  <img src="https://cdn-icons-png.flaticon.com/512/1554/1554401.png" className="h-8 opacity-40 grayscale" alt="COD" />
                </div>
                <div className="mt-4 p-6 border border-gray-100 rounded-2xl flex items-center justify-between opacity-50 cursor-not-allowed">
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-200" />
                    <span className="text-gray-400 text-lg">الدفع الإلكتروني (قريباً)</span>
                  </div>
                  <div className="flex gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" className="h-3" alt="Mastercard" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" className="h-3" alt="Visa" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Summary */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-900 rounded-[2.5rem] shadow-2xl p-8 md:p-10 sticky top-24 text-white overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/10 rounded-full -mr-16 -mt-16 blur-3xl" />

                <h2 className="text-2xl font-black mb-8 uppercase tracking-tighter flex items-center justify-between">
                  ملخص الطلب
                  <span className="text-xs font-bold text-gray-500 bg-white/5 px-3 py-1 rounded-full">{cart.length} قطع</span>
                </h2>

                <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar border-b border-white/5 pb-10">
                  {cart.map((item) => (
                    <div key={item.cartItemId} className="flex gap-4 group">
                      <div className="w-20 h-24 relative rounded-2xl overflow-hidden flex-shrink-0 border border-white/10">
                        <SafeImage src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
                        <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full shadow-lg">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0 py-1">
                        <h4 className="font-bold text-sm truncate uppercase tracking-tight">{item.name}</h4>
                        <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mt-1">
                          {item.selectedSize && `Size: ${item.selectedSize}`} {item.selectedColor && ` • Color: ${item.selectedColor}`}
                        </p>
                        <p className="text-lg font-black mt-2">{item.price} ج.م</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 font-bold text-sm">
                  <div className="flex justify-between text-gray-400 uppercase tracking-widest text-[10px]">
                    <span>المجموع الفرعي</span>
                    <span className="text-white text-sm">{subtotal} ج.م</span>
                  </div>
                  <div className="flex justify-between text-gray-400 uppercase tracking-widest text-[10px]">
                    <span>رسوم الشحن</span>
                    <span className={`text-sm ${shippingCost === 0 ? 'text-green-400' : 'text-white'}`}>
                      {shippingCost === 0 ? 'مجاني' : `${shippingCost} ج.م`}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-400 uppercase tracking-widest text-[10px]">
                    <span>الضريبة المضافة</span>
                    <span className="text-white text-sm">{tax} ج.م</span>
                  </div>
                  <div className="pt-6 border-t border-white/10 flex justify-between items-end mt-6">
                    <div>
                      <span className="block text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">الإجمالي الكلي</span>
                      <span className="text-4xl font-black text-white leading-none">{total} <span className="text-lg font-medium text-gray-500">ج.م</span></span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  form="checkout-form"
                  disabled={isSubmitting}
                  className="w-full mt-10 bg-amber-600 text-white py-5 rounded-3xl font-black text-lg hover:bg-amber-500 transition-all shadow-2xl shadow-amber-600/20 disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-widest active:scale-95"
                >
                  {isSubmitting ? (
                    <span className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      تأكيد الطلب الآن {React.createElement(FiLock as any)}
                    </>
                  )}
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
