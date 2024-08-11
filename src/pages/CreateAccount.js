import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setIsLoading(true);
    axios.post('http://localhost:3001/api/register', {
      email: formData.email,
      password: formData.password
    })
      .then(response => {
        console.log('Account created successfully:', response.data);
        navigate('/'); // Redirect to login page after successful account creation
      })
      .catch(error => {
        // Log the error response details
        console.error('Registration error:', error.response);
        if (error.response && error.response.data) {
          setError(error.response.data.message || 'Failed to create account. Please try again.');
        } else {
          setError('Failed to create account. Please try again.');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <CreateAccountContainer>
      <CreateAccountForm onSubmit={handleSubmit}>
        <Title>Create Account</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </SubmitButton>
      </CreateAccountForm>
    </CreateAccountContainer>
  );
};

// Styling Components

const CreateAccountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
`;

const CreateAccountForm = styled.form`
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

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
`;

export default CreateAccount;
