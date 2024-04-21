import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("يجب إدخال بريد إلكتروني صالح"),
  password: z.string().min(10, "كلمة المرور يجب أن تكون 10 حروف علي الأقل"),
});

export default loginSchema;
