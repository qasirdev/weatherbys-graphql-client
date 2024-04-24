import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
	mutation Signup($fullName: String!, $email: String!, $password: String!) {
		signup(fullName:$fullName, email: $email, password: $password) {
      user {
        id
        email
        fullName
        todos {
          id
          title
          completed
        }
      }
    }
	}
`;
export const LOGIN_USER = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
      user {
        id
        email
        fullName
        todos {
          id
          title
          completed
        }
      }
    }
	}
`;

export const LOGOUT_USER = gql`
	mutation Mutation {
    logout
  }
`;

type TodoUpdate = {
  id: string;
  completed: boolean;
  title: string;
}
export const UPDATE_TODO = gql`
  mutation UpdateTodo($input: TodoUpdate!) {
    updateTodo(input: $input) {
      id
      completed
      title
      userId
    }
  }
`;
type TodoDelete = {
  id: string;
}
export const DELETE_TODO = gql`
  mutation DeleteTodo($input: TodoDelete!) {
    deleteTodo(input: $input) {
      completed
      id
      title
      userId
    }
  }
`;

type TodoInput= {
  title: String
  completed: Boolean
  userId: String
}
export const CREATE_TODO = gql`
  mutation CreateTodo($input: TodoInput!) {
    createTodo(input: $input) {
      id
      completed
      title
      userId
    }
  }
`;

