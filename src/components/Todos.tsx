'use client'
import React, { useEffect, useState } from 'react'

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '@/graphql/mutations';

const Todos = () => {
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('1234')
  const [userLogin] = useMutation(LOGIN_USER, {
    variables: { email, password },
  });

  useEffect(() => {
    userLogin({ variables: { email, password } })
  }, [userLogin, email, password])
  return (
    <div>Todos {JSON.stringify({})}</div>
  )
}

export default Todos
