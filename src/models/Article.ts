import { Schema, model, models } from "mongoose";

export interface TArticle {
  _id: Schema.Types.ObjectId;
  title: string;
  content: string;
  image: string;
}

const ArticleSchema = new Schema<TArticle>(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },
    title: {
      type: String,
      required: [true, "يجب إدخال عنوان للمقاله"],
    },
    content: {
      type: String,
      required: [true, "يجب إدخال محتوى المقاله"],
      minlength: 100,
    },
    image: {
      type: String,
      required: [true, "يجب إدخال رابط لصورة المقاله"],
    },
  },
  { versionKey: false }
);

export const Article = models.Article || model("Article", ArticleSchema);
