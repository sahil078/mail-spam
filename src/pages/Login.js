import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        axios.post('http://localhost:3001/api/login', credentials)
            .then(response => {
                // Handle successful login
                console.log('Login successful:', response.data);
                navigate('/onebox'); // Redirect to Onebox after successful login
            })
            .catch(error => {
                console.error('Login error:', error);
                setError('Failed to login. Please check your email and password.');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <LoginContainer>
            <LoginForm onSubmit={handleSubmit}>
                <Title>Login</Title>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />
                <SubmitButton type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </SubmitButton>
                <Divider>or</Divider>
                <GoogleLoginButton href="https://hiring.reachinbox.xyz/api/v1/auth/google-login?redirect_to=https://frontend.com">
                    Login with Google
                </GoogleLoginButton>
                <CreateAccountLink>
                    Don't have an account? <a href="/create-account">Create one</a>
                </CreateAccountLink>
            </LoginForm>
        </LoginContainer>
    );
};

// Styling Components

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
`;

const LoginForm = styled.form`
  background-color: ${({ theme }) => theme.formBackground};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.primaryText};
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid ${({ theme }) => theme.inputBorder};
  border-radius: 5px;
  font-size: 16px;
  color: ${({ theme }) => theme.inputText};

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    outline: none;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const GoogleLoginButton = styled.a`
  display: inline-block;
  padding: 12px 20px;
  background-color: #007BFF;
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  margin-top: 15px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Divider = styled.div`
  margin: 20px 0;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
`;

const CreateAccountLink = styled.div`
  margin-top: 15px;
  font-size: 14px;
  color: ${({ theme }) => theme.text};

  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default LoginPage;
