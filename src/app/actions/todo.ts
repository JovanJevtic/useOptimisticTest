"use server";

import prisma from "@/app/lib/db";
import { revalidatePath } from "next/cache";

export const addTodo = async (formData: FormData) => {
  try {
    const text = formData.get("text");

    if (!text) {
      throw new Error("No text provided");
    }

    const todo = await prisma.todo.create({
      data: {
        text: text as string,
      },
    });

    return { message: `Todo created with id: ${todo.id}` };
  } catch (error: any) {
    throw new Error(error);
  } finally {
    revalidatePath("/todos");
  }
};
