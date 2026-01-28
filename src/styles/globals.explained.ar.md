# شرح ملف `globals.css` (بالعربية)

الملف هذا يحتوي أنماط عامة (Global CSS) للموقع. وضعته مقسماً حسب الأقسام الموجودة في الملف مع شرح بسيط لكل سطر وتأثيره، ونصائح صغيرة إن أردت تعديل شكل الموقع.

---

## توجيهات Tailwind
@tailwind base;
@tailwind components;
@tailwind utilities;

شرح: هذه الأسطر خاصة بـ Tailwind CSS. تُخبر معالج الـ CSS بأن يدخل قواعد الأساس، ومكونات Tailwind الجاهزة، والـ utilities. إذا لا تستخدم Tailwind يمكنك تجاهلها، لكن مشروعك يستخدم Tailwind.

---

## استيراد الخطوط
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Tajawal:wght@300;400;700&display=swap');

شرح: يستورد خطّين من Google Fonts — `Tajawal` (مناسب للعربية) و`Inter` (لـ Latin). يعمل فقط لو الجهاز متصل بالإنترنت. إذا تريد العمل أوفلاين، يمكنك استبدالها بخط محلي.

---

## متغيرات البراند (CSS variables)
:root{
  --brand-1: #F59E0B;
  --brand-2: #F97316;
  --muted: #6B7280;
  --bg: #FAFAFB;
}

شرح: هذه متغيرات تستخدمها بقية الـ CSS لتوحيد الألوان. تعني:
- `--brand-1` و`--brand-2`: ألوان التدرج للزرّ الرئيسي
- `--muted`: لون نص ثانوي
- `--bg`: لون خلفية الصفحة

لو تريد تغيير الثيم (مثلاً أزرق بدل برتقالي) غيّر القيم هنا فقط.

---

## اتجاه الصفحة (RTL)
html { direction: rtl; }

شرح: يجعل اتجاه النص من اليمين لليسار، مناسب للعربية.

---

## قواعد أساسية للصفحة
body {
  background-color: var(--bg);
  color: #111827; /* text-gray-900 */
  font-family: 'Tajawal', 'Inter', system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; /* عربي أولاً */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}

شرح: يحدد خلفية الصفحة، الخط الافتراضي (يعطي أسبقية لخط Tajawal لأن الموقع عربي)، وبعض تحسينات العرض على المتصفحات، ويزيل الهامش والـ padding الافتراضيين.

---

## بطاقة عامة
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.06);
  padding: 1rem;
}

شرح: هذه قاعدة جاهزة لأي عنصر تريد أن يبدو "بطاقة" — خلفية بيضاء، زوايا مدورة، ظل خفيف، وحشو داخلي.

---

## زر البراند
.btn-brand {
  background: linear-gradient(90deg, var(--brand-1), var(--brand-2));
  color: white;
  border-radius: 9999px;
  padding: 0.6rem 1rem;
  box-shadow: 0 10px 30px rgba(249,115,22,0.12);
  transition: transform .12s ease, opacity .12s ease, box-shadow .12s ease;
}
.btn-brand:hover { transform: translateY(-3px); opacity: 0.98; box-shadow: 0 14px 40px rgba(249,115,22,0.16); }

شرح: ستايل الزرّ الرئيسي (ذي الخلفية المتدرجة). `border-radius: 9999px` يجعل الزر مستدير الحواف (pill). هناك تأثير رفع بسيط عند المرور فوقه.

---

## زر ثانوي
.btn-ghost {
  background: white;
  border: 1px solid #E5E7EB; /* gray-200 */
  border-radius: 8px;
  padding: 0.5rem 1rem;
}
.btn-ghost:hover { background-color: #F9FAFB; }

شرح: زر بسيط يستخدم في الحالات الثانوية (outline). عند المرور يتغير لون الخلفية قليلاً.

---

## ملخص ثابت للشاشات الكبيرة
.sticky-summary { position: static; }
@media (min-width: 1024px) {
  .sticky-summary { position: sticky; top: 1.5rem; }
}

شرح: على شاشات كبيرة (`min-width:1024px`) يصبح العنصر "sticky" — أي يثبت عند التمرير ضمن حاويته عندما يقترب من أعلى الشاشة. مفيد لملخص السلة أو تفاصيل الطلب.

---

## صور داخل البطاقات
.card img, .card .next-image {
  border-radius: 8px;
  display: block;
  width: 100%;
  height: 220px;
  object-fit: cover;
}

شرح مفصّل:
- `border-radius: 8px` → يدوّر حواف الصورة داخل البطاقة.
- `display: block` → يجعل الصورة تعامل كعنصر كتلي، ليس inline؛ هذا يسهل التحكم بالعرض والهوامش.
- `width: 100%` → الصورة تملأ عرض الحاوية (العنصر الأب).
- `height: 220px` → ارتفاع ثابت 220px لصور البطاقات.
- `object-fit: cover` → إذا كانت أبعاد الصورة مختلفة، سيتم قص الأجزاء الزائدة بحيث تملأ المساحة دون تشويه.

ملاحظة: إذا تريد أن لا يُقص جزء من الصورة ويفضل أن يظهر كله، استبدل `object-fit: cover` بـ `object-fit: contain` أو احذف `height` ليصبح الارتفاع حسب نسبة الصورة.

---

## تأثير رفع على البطاقات عند المرور
.card-hover:hover { transform: translateY(-6px); box-shadow: 0 18px 50px rgba(15, 23, 42, 0.12); }

شرح: يرفع البطاقة ويزيد الظل قليلاً لعمل تأثير "محاذاة للاعلى" عند المرور بالماوس.

---

## حاوية بعرض أقصى
.container-max { max-width: 1100px; margin-left: auto; margin-right: auto; }

شرح: يحد عرض الحاوية إلى 1100px ويجعلها مركزة أفقياً.

---

## فاصل بسيط
.separator { height: 1px; background: rgba(0,0,0,0.06); margin: 0.75rem 0; }

شرح: يستخدم كفاصل أفقي خفيف بين أقسام.

---

## مؤشر تحميل (Spinner)
.spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 9999px;
  animation: spin .8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

شرح: دائرة دوارة بسيطة تستخدم كمؤشر تحميل صغير.

---

## نصائح سريعة
- إذا تريد تغيّر الثيم (ألوان البراند) غيّر المتغيرات في `:root` — هذا أسهل مكان للتخصيص.
- لصور متجاوبة بشكل أفضل، فكّر باستخدام `aspect-ratio` (مثلاً `aspect-ratio: 1/1`) بدلاً من `height` ثابت.
- لو تعمل أوفلاين أو تريد الأداء، استبدل استيراد Google Fonts بخط محلي أو استضافة الخطوط داخل المشروع.

---

إذا تريد، أقدر:
- أترجم التعليقات داخل نفس ملف `globals.css` (وأحافظ على الشيفرة نفسها) — أو
- أطبق تغيير (مثلاً `aspect-ratio` بدلاً من `height`) وأجرب البنية وأشغّل الـ build لأعرض النتيجة.

قل لي أي خيار تفضّل: "ترجم داخل الملف" أو "أعمل تعديل اقتراحي" أو "بس اشرحلي باقي الملفات"، وسأنفّذ فورًا.