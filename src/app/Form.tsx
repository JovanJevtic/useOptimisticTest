"use client";

import { addTodo } from "@/app/actions/todo";
import { Todo } from "@prisma/client";
import {
  ElementRef,
  useEffect,
  useOptimistic,
  useRef,
  useTransition,
} from "react";
import { v4 as uuid } from "uuid";
import AddButton from "./AddButton";

type Props = {
  todos: Todo[];
};

type PendingTodo<Todo> = Partial<Todo> & { sending?: boolean };

const Form = ({ todos }: Props) => {
  const formRef = useRef<ElementRef<"form">>(null);
  const [_, startTransition] = useTransition();

  const [optimisticTodos, addOptimisticTodo] = useOptimistic<
    PendingTodo<Todo>[],
    string
  >(todos, (currTodos, newTodo: string) => [
    {
      text: newTodo,
      id: uuid(),
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      sending: true,
    },
    ...currTodos,
  ]);

  //   const [optimisticTodos, addOptimisticTodo] = useOptimistic(todos);

  useEffect(() => {
    console.log(optimisticTodos);
  }, [optimisticTodos]);

  return (
    <>
      <form
        ref={formRef}
        action={async (formData) => {
          formRef.current?.reset();

          startTransition(async () => {
            addOptimisticTodo(formData.get("text") as string);
          });

          await addTodo(formData);
        }}
        className="flex-row flex"
      >
        <label>Input text</label>
        <input type="text" name="text" className="bg-blue-950" />
        <AddButton />
      </form>
      <ul className="mt-5">
        {optimisticTodos.map((todo) => (
          <li key={todo.id} className="mb-3">
            <p>{todo.text}</p>
            {todo.sending && <p className="text-red-700">Sending...</p>}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Form;
