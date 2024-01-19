import prisma from "@/app/lib/db";
import { Todo } from "@prisma/client";
import Form from "./Form";

const TodosPage = async () => {
  const todos: Todo[] = await prisma.todo.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-96">
      <Form todos={todos} />
    </div>
  );
};

export default TodosPage;
