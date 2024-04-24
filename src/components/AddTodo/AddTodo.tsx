import { CREATE_TODO } from "@/graphql/mutations";
import { GET_TODOS_BY_USER_ID } from "@/graphql/queries";
import { useMutation } from "@apollo/client";
import { useState, FormEvent } from "react"

type Props = {
  userId: string,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export default function AddItemForm({userId, setTodos }: Props) {
    const [item, setItem] = useState("");
    const [createTodo] = useMutation(CREATE_TODO, {
      refetchQueries:[{query: GET_TODOS_BY_USER_ID, variables: { id: userId}}]
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!item) return
        try {
          const savedTodo = await createTodo({
            variables: {
              input: {
                title: item,
                completed: false,
                userId 
              }
            },
            refetchQueries:[{query: GET_TODOS_BY_USER_ID, variables: { id: userId}}]
          })
          setTodos(prev => [...prev, savedTodo?.data?.createTodo])

          setItem("")
      } catch (err) {
        setItem("")
        if (err instanceof Error) console.log(err.message)
      }

    }

    return (
      <form onSubmit={handleSubmit} className="flex gap-2 items-center">
        <label hidden htmlFor="title">New Todo</label>
        <input
          data-test="new-todo"
          type="text"
          id="title"
          name="title"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          className="text-2xl p-1 rounded-lg flex-grow w-full"
          placeholder="New Todo"
          autoFocus
        />

        <button
          type="submit"
          className="p-2 text-xl rounded-2xl text-black border-solid border-black border-2 max-w-xs bg-green-500 hover:cursor-pointer hover:bg-green-400 disabled:bg-gray-300"
          disabled={!item ? true : false}
        >
          Submit
        </button>
      </form>
    )
}
