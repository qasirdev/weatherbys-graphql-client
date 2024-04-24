'use client'
import TodoList from '@/components/TodoList/TodoList'
import AddTodo from '@/components/AddTodo/AddTodo'
import { Todo } from '@/types';
import React, { useState } from 'react'

interface Props {
  params: {
    userId: string;
  };
}
const TodoListPage = ({ params: { userId } }: Props) => {
  const [todos, setTodos] = useState<Todo[]>([])
  
  if (!userId) {
    return <div>No user id{JSON.stringify(userId)}</div>
  }
  return (
    <>
      <AddTodo setTodos={setTodos} userId={userId} />
      <TodoList userId={userId} todos={todos} setTodos={setTodos}/>    
    </>
  )
}

export default TodoListPage
