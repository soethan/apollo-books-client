import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import './style.scss';
import { loginQuery, userSessionQuery } from '../../queries/loginQueries';

const LoginForm = props => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [login, { client, loading, data, error }] = useLazyQuery(loginQuery);

  const valid = () => userName !== '' && password !== '';

  const handleUserNameChange = e => {
    setUserName(e.target.value);
  }
  const handlePasswordChange = e => {
    setPassword(e.target.value);
  }

  const handleLogin = () => {
    login({
      variables: {
        userName,
        password
      }
    });
  };

  const handleCancel = () => {
    props.onClose();
  }

  if (data && data.login && data.login.id) {
    client.cache.writeQuery({
      query: userSessionQuery,
      data: {
        userName: data.login.userName,
        isLoggedIn: true,
      },
    });
    return '';
  } else if (loading) {
    return <div>Logging in</div>;
  }

  return (
    <div className="container form">
      {error && error.graphQLErrors && error.graphQLErrors.map(err => <div className="row error" key={err.message.replace(' ', '-')}>{err.message}</div>)}
      <div className="row">
        <label>User Name: </label>
        <input type="text" value={userName} onChange={handleUserNameChange} />
      </div>
      <div className="row">
        <label>Password: </label>
        <input type="password" value={password} onChange={handlePasswordChange} />
      </div>
      <div className="row btn-row last-row">
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleLogin} disabled={!valid()}>Login</button>
      </div>
    </div>
  );
}

export default LoginForm;
