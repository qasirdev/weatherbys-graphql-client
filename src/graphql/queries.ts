import { gql } from "@apollo/client";

export const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      completed
    }
  }
`;

export const GET_TODO = gql`
  query GetTodo($id: String!) {
    todo(id:$id) {
      id
      title
      completed
      userId
		}
  }
`
export const GET_TODOS_BY_USER_ID = gql`
  query TodosByUserId($id: String!) {
  todosByUserId(id: $id) {
    id
    completed
    title
    userId
  }
}
`
