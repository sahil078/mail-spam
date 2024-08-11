import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';

const Reply = () => {
  const { threadId } = useParams();
  const [thread, setThread] = useState(null);
  const [reply, setReply] = useState({
    from: '',
    to: '',
    subject: '',
    body: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the thread details
    axios.get(`https://hiring.reachinbox.xyz/api/v1/onebox/messages/${threadId}`)
      .then(response => {
        setThread(response.data);
        setReply(prev => ({
          ...prev,
          from: response.data.to, // Assuming 'from' is the logged-in user's email
          to: response.data.from,
          subject: `Re: ${response.data.subject}`
        }));
      })
      .catch(error => {
        console.error('Error fetching thread:', error);
      });
  }, [threadId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReply(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`https://hiring.reachinbox.xyz/api/v1/onebox/reply/${threadId}`, reply)
      .then(() => {
        navigate('/onebox'); // Redirect to the onebox page after sending the reply
      })
      .catch(error => {
        console.error('Error sending reply:', error);
      });
  };

  return (
    <ReplyContainer>
      {thread ? (
        <ReplyForm onSubmit={handleSubmit}>
          <Title>Reply to: {thread.subject}</Title>
          <Input
            type="email"
            name="from"
            placeholder="From"
            value={reply.from}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="to"
            placeholder="To"
            value={reply.to}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="subject"
            placeholder="Subject"
            value={reply.subject}
            onChange={handleChange}
            required
          />
          <Textarea
            name="body"
            placeholder="Compose your reply here..."
            value={reply.body}
            onChange={handleChange}
            required
          />
          <SubmitButton type="submit">Send Reply</SubmitButton>
        </ReplyForm>
      ) : (
        <p>Loading...</p>
      )}
    </ReplyContainer>
  );
};

// Styling Components

const ReplyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
`;

const ReplyForm = styled.form`
  background-color: ${({ theme }) => theme.formBackground};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.primaryText};
  margin-bottom: 20px;
  text-align: center;
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

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid ${({ theme }) => theme.inputBorder};
  border-radius: 5px;
  font-size: 16px;
  color: ${({ theme }) => theme.inputText};
  height: 200px;
  resize: vertical;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    outline: none;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: ${({ theme }) => theme.primary};
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }
`;

export default Reply;
