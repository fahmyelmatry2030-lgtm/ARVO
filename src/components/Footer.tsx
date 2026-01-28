import React from 'react'
import Link from 'next/link'
import Logo from './Logo'
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube, FiMapPin, FiPhone, FiMail } from 'react-icons/fi'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-400 pt-20 pb-10 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          {/* Brand Info */}
          <div className="space-y-6">
            <Logo />
            <p className="text-sm leading-relaxed max-w-xs">
              نحن نؤمن بأن الموضة هي تعبير عن الذات. نقدم لك أحدث التصاميم العالمية بجودة استثنائية لتليق بك.
            </p>
            <div className="flex gap-4">
              {[FiInstagram, FiTwitter, FiFacebook, FiYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-white hover:bg-amber-600 hover:-translate-y-1 transition-all">
                  {React.createElement(Icon as any, { className: "w-5 h-5" })}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">روابط سريعة</h4>
            <ul className="space-y-4 text-sm font-bold">
              {['الرئيسية', 'المتجر', 'التصنيفات', 'عروض الموسم', 'قصتنا'].map((link, i) => (
                <li key={i}>
                  <Link href="#" className="hover:text-amber-500 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 scale-0 group-hover:scale-100 transition-transform" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">الدعم والمساعدة</h4>
            <ul className="space-y-4 text-sm font-bold">
              {['حسابي', 'تتبع الطلب', 'سياسة الاستبدال', 'الأسئلة الشائعة', 'اتصل بنا'].map((link, i) => (
                <li key={i}>
                  <Link href="#" className="hover:text-amber-500 transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">تواصل معنا</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-amber-500 flex-shrink-0">
                  {React.createElement(FiMapPin as any)}
                </div>
                <div className="text-sm">
                  <p className="text-white font-bold">المقر الرئيسي</p>
                  <p>القاهرة، مصر</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-amber-500 flex-shrink-0">
                  {React.createElement(FiPhone as any)}
                </div>
                <div className="text-sm">
                  <p className="text-white font-bold">خدمة العملاء</p>
                  <p dir="ltr" className="text-right">+20 100 000 0000</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            © {currentYear} AROVA — جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-6 items-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-3 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" alt="PayPal" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  )
}
