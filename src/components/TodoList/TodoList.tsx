import { AppDispatch, RootState } from '@/app/store/store';
import { GET_TODOS_BY_USER_ID } from '@/graphql/queries';
import { useQuery } from '@apollo/client';
import React from 'react'
import { useDispatch } from 'react-redux';
import TodoItem from '../TodoItem/TodoItem';
import { Todo } from '@/types';
import { addSelectedUser } from '@/app/store/features/userSlice';

type Props = {
  userId: string | undefined,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList = ({userId, todos, setTodos}: Props) => {
  const dispatch: AppDispatch = useDispatch();

  const { data, loading, error } = useQuery(GET_TODOS_BY_USER_ID, {
    variables: { id:userId },
  });
  
  const handleLogin = () =>{
    dispatch(addSelectedUser(null));
  }

  if(loading) {
    return <div>Loading</div>
  }
  if(error) {
    return (
      <>
        {handleLogin()}
        <div>{error.graphQLErrors[0].message}</div>
        <div>Please login</div>
      </>
    )
  }

  return (
    <div className='h-screen'>
      {
        data.todosByUserId
        .map((todo:Todo) => (
          <TodoItem key={todo.id} todo={todo} setTodos={setTodos}/>
        ))
      }
    </div>
  )
}

export default TodoList
