import React, { useState } from 'react';
import { AuthWraper, AuthInput, AuthButton } from './styled';

// eslint-disable-next-line react/prop-types
function AuthForm({ title, handleClick, type }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  return (
    type === 'login' ? (
      <AuthWraper>
        <AuthInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <AuthInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <AuthButton
          onClick={() => handleClick(email, password)}
        >
          {title}
        </AuthButton>
      </AuthWraper>
    ) : (
      <AuthWraper>
        <AuthInput
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholde="FirstName"
        />
        <AuthInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <AuthInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <AuthButton
          onClick={() => handleClick(email, password, userName)}
        >
          {title}
        </AuthButton>
      </AuthWraper>
    )
  );
}

export default AuthForm;
