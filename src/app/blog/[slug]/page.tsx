import Link from "next/link";
import { notFound } from "next/navigation";

const posts = [
  {
    slug: "pentest-tips",
    title: "5 نصائح لاحتراف اختبار الاختراق",
    content: `
      1. تدرب باستمرار على بيئات افتراضية.
      2. تعلم استخدام الأدوات الحديثة.
      3. تابع أحدث الثغرات والتقنيات.
      4. شارك في مسابقات CTF.
      5. طور مهاراتك في البرمجة.
    `,
  },
  {
    slug: "cybersecurity-basics",
    title: "أساسيات الأمن السيبراني لكل مبتدئ",
    content: `
      - ما هو الأمن السيبراني؟
      - أهمية حماية المعلومات.
      - أنواع الهجمات الشائعة.
      - نصائح عملية للحماية.
    `,
  },
  {
    slug: "passwords-security",
    title: "كيفية إنشاء كلمات مرور قوية وآمنة",
    content: `
      - استخدم كلمات مرور طويلة ومعقدة.
      - لا تكرر نفس كلمة المرور.
      - استخدم مدير كلمات مرور.
      - فعّل التحقق بخطوتين.
    `,
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
// ...existing code...
import Link from "next/link";
      </div>
    </main>
  );
}
