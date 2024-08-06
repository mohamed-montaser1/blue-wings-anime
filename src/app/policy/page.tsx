"use client";
import { Container } from "@/components";

const Policy = () => {
  return (
    <Container>
      <h1 className="text-3xl font-bold mb-4 text-slate-200">سياسة الموقع</h1>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-slate-300">1. المقدمة</h2>
        <p className="text-slate-200">مرحبًا بكم في موقع [اسم الموقع]، موقع مانغا يوفر للمستخدمين الوصول إلى مجموعة واسعة من المانغا والفصول المتنوعة. باستخدامك لهذا الموقع، فإنك توافق على الالتزام بهذه السياسة وشروط الاستخدام. إذا كنت لا توافق على أي جزء من هذه السياسة، يرجى عدم استخدام الموقع.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-slate-300">2. استخدام الموقع</h2>
        <ul className="list-disc list-inside">
          <li className="text-slate-200">يجب على المستخدمين أن يكونوا في سن القانونية لاستخدام الموقع.</li>
          <li className="text-slate-200">يُمنع استخدام الموقع لأي أغراض غير قانونية أو غير مصرح بها.</li>
          <li className="text-slate-200">لا يُسمح بنشر أو توزيع أي محتوى غير قانوني، أو مسيء، أو مضر، أو فاحش على الموقع.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-slate-300">3. حساب المستخدم</h2>
        <ul className="list-disc list-inside">
          <li className="text-slate-200">يجب على المستخدمين تسجيل حساب لاستخدام بعض الخدمات على الموقع.</li>
          <li className="text-slate-200">يتحمل المستخدم مسؤولية الحفاظ على سرية معلومات حسابه.</li>
          <li className="text-slate-200">يُحظر مشاركة حساب المستخدم مع الآخرين.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-slate-300">4. المحتوى</h2>
        <p className="text-slate-200">جميع حقوق الطبع والنشر والملكية الفكرية للمحتوى المعروض على الموقع تعود إلى أصحابها. لا يُسمح بنسخ أو توزيع أو تعديل أو إنشاء أعمال مشتقة من المحتوى بدون إذن صريح من أصحاب الحقوق.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-slate-300">5. الروابط الخارجية</h2>
        <p className="text-slate-200">قد يحتوي الموقع على روابط لمواقع خارجية. نحن لسنا مسؤولين عن محتوى أو ممارسات هذه المواقع. يُنصح المستخدمون بقراءة سياسات الخصوصية والشروط الخاصة بالمواقع الخارجية.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-slate-300">6. الخصوصية</h2>
        <p className="text-slate-200">نحترم خصوصية المستخدمين ونلتزم بحماية البيانات الشخصية. لمزيد من المعلومات حول كيفية جمع واستخدام البيانات، يرجى قراءة سياسة الخصوصية الخاصة بنا.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-slate-300">7. التعديلات</h2>
        <p className="text-slate-200">نحتفظ بالحق في تعديل هذه السياسة في أي وقت. سيتم إخطار المستخدمين بالتعديلات من خلال إشعار على الموقع. يُنصح المستخدمون بمراجعة هذه السياسة بانتظام لضمان معرفتهم بالتحديثات.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-slate-300">8. التواصل</h2>
        <p className="text-slate-200">إذا كان لديك أي استفسارات أو شكاوى بشأن هذه السياسة، يرجى التواصل معنا عبر البريد الإلكتروني: [البريد الإلكتروني].</p>
      </section>
    </Container>
  );
};

export default Policy;