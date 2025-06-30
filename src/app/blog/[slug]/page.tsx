import Link from "next/link";
import { notFound } from "next/navigation";

const posts = [
  {
    slug: "pentest-tips",
    title: "5 نصائح لاحتراف اختبار الاختراق",
    content: `\n1. تدرب باستمرار على بيئات افتراضية.\n2. تعلم استخدام الأدوات الحديثة.\n3. تابع أحدث الثغرات والتقنيات.\n4. شارك في مسابقات CTF.\n5. طور مهاراتك في البرمجة.\n`,
  },
  {
    slug: "cybersecurity-basics",
    title: "أساسيات الأمن السيبراني لكل مبتدئ",
    content: `\n- ما هو الأمن السيبراني؟\n- أهمية حماية المعلومات.\n- أنواع الهجمات الشائعة.\n- نصائح عملية للحماية.\n`,
  },
  {
    slug: "passwords-security",
    title: "كيفية إنشاء كلمات مرور قوية وآمنة",
    content: `\n- استخدم كلمات مرور طويلة ومعقدة.\n- لا تكرر نفس كلمة المرور.\n- استخدم مدير كلمات مرور.\n- فعّل التحقق بخطوتين.\n`,
  },
  {
    slug: "ai-in-ecommerce",
    title: "دور الذكاء الاصطناعي في التجارة الإلكترونية",
    content: `\nالذكاء الاصطناعي يساعد في تخصيص تجربة المستخدم، التوصية بالمنتجات، وتحليل بيانات العملاء لتحسين المبيعات.\n`,
  },
  {
    slug: "pentest-beginners",
    title: "دليل المبتدئين لاختبار الاختراق",
    content: `\nاختبار الاختراق للمبتدئين يبدأ بفهم دورة حياة الهجوم، جمع المعلومات، تحليل الثغرات، واستخدام أدوات مثل Metasploit وWireshark.\nلا تنسَ أهمية التقارير النهائية والتوصيات العملية.\n`,
  },
];

interface Props {
  params: { slug: string };
}

export default function BlogPost({ params }: Props) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return notFound();
  return (
    <main className="container mx-auto py-10 rtl text-right">
      <div className="bg-white rounded-lg shadow p-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="text-gray-800 whitespace-pre-line mb-4">{post.content}</div>
        <Link href="/blog" className="text-blue-600 hover:underline">&larr; الرجوع للمدونة</Link>
      </div>
    </main>
  );
}
