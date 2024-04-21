import { z } from "zod";

const registerSchema = z
  .object({
    username: z.string().min(10, "إسم المستخدم يجب أن يكون 10 حروف علي الأقل"),
    email: z.string().email("يجب إدخال بريد إلكتروني صالح"),
    password: z.string().min(10, "كلمة المرور يجب أن تكون 10 حروف علي الأقل"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "يجب أن تكون كلمات المرور نفس القيمة",
    path: ["confirmPassword"],
  });

export default registerSchema;
