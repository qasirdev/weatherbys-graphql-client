import { Todo } from '@/types'
import { Button, Card, CardActions, CardContent, Checkbox, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { ChangeEvent, MouseEvent } from 'react'
import { useMutation } from '@apollo/client'
import { DELETE_TODO, UPDATE_TODO } from '@/graphql/mutations'
import { GET_TODOS_BY_USER_ID } from '@/graphql/queries'

type Props = {
  todo: Todo,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}
const TodoItem = ({ todo, setTodos }: Props) => {
  const [updateTodo] = useMutation(UPDATE_TODO, {
    refetchQueries:[{query: GET_TODOS_BY_USER_ID, variables: { id: todo.userId}}]
  });
  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries:[{query: GET_TODOS_BY_USER_ID, variables: { id: todo.userId}}]
  });
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
        const updatedTodo = await updateTodo({
          variables: {
            input: {
              id:todo.id,
              completed: !todo.completed,
              title: todo.title
            }
          },
          refetchQueries:[{query: GET_TODOS_BY_USER_ID, variables: { id: todo.userId}}]
        })
        setTodos(prevTodos => [...prevTodos.filter(prev => prev.id !== todo.id), updatedTodo?.data?.updateTodo])
    } catch (err) {
        if (err instanceof Error) console.log(err.message)
    }
  }

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
      const updatedTodo = await deleteTodo({
        variables: {
          input: {
            id:todo.id
          }
        },
        refetchQueries:[{query: GET_TODOS_BY_USER_ID, variables: { id: todo.userId}}]
      })
      debugger;
      setTodos(prev => [...prev.filter(td => td.id !== todo.id)])
    try {
        setTodos(prev => [...prev.filter(td => td.id !== todo.id)])
    } catch (err) {
        if (err instanceof Error) console.log(err.message)
    }
  }
  return (
    <Card sx={{ mb: 2 }}> {/* Card for container */}
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div> {/* Left side content */}
          <Typography variant="h6" component="label" data-testid={`todo-item-${todo.id}`} htmlFor={todo.id.toString()}>
            {todo.title}
          </Typography>
          <Typography variant="body2">
            Completed: {JSON.stringify(todo.completed)} 
          </Typography>
        </div>

        <CardActions sx={{ gap: 1 }}> {/* Right side actions */}
          <Checkbox
            checked={todo.completed}
            id={todo.id.toString()}
            name={todo.id.toString()}
            onChange={handleChange}
            sx={{ 
              '&.Mui-checked': { color: 'success.main' }  // Customize checked color
            }}
          />
          <Button
            data-testid="delete-button"
            onClick={handleDelete}
            variant="contained"
            color="error"
            size="large"
            style={{
              borderRadius: '20px',
              borderWidth: '2px',
              borderColor: 'black',
              maxWidth: 'fit-content',
            }}
            sx={{
              '&:hover': {
                cursor: 'pointer',
                backgroundColor: '#ff3333',
              },
            }}
          >
            <FaTrash />
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  )
}

export default TodoItem
