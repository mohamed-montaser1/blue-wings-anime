"use client";
import { Container, Input } from "@/components";

export default function CreateManga() {
  return (
    <Container className="mt-20">
      <div>
        <Input className="!w-fit">
          <input
            type="text"
            placeholder="أدخل إسم العمل"
            className="input"
          />
        </Input>
        <Input className="!w-fit">
          <input
            type="text"
            placeholder="أدخل نوع العمل"
            className="input"
          />
        </Input>
        <Input className="!w-fit">
          <select multiple>
            <option value="action">Action</option>
            <option value="adventure">Adventure</option>
          </select>
        </Input>
        <Input className="!w-fit">
          <input
            type="text"
            placeholder="أدخل إسم العمل"
            className="input"
          />
        </Input>
        <Input className="!w-fit">
          <input
            type="text"
            placeholder="أدخل إسم العمل"
            className="input"
          />
        </Input>
      </div>
    </Container>
  );
}
