import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("يجب ان تدخل بريد الكتروني صالح"),
  password: z.string().min(8, "كلمة المرور لا يجب أن تقل عن 8 أحرف"),
});

export default loginSchema;
