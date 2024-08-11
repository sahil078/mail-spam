import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Onebox = () => {
    const [threads, setThreads] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://hiring.reachinbox.xyz/api/v1/onebox/list')
            .then(response => {
                setThreads(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const deleteThread = (threadId) => {
        axios.delete(`https://hiring.reachinbox.xyz/api/v1/onebox/messages/${threadId}`)
            .then(() => {
                setThreads(prev => prev.filter(thread => thread.id !== threadId));
            })
            .catch(error => {
                console.error('Error deleting thread:', error);
            });
    };

    const handleReply = (threadId) => {
        navigate(`/reply/${threadId}`);
    };

    const handleKeyDown = (event, threadId) => {
        if (event.key === 'D' || event.key === 'd') {
            deleteThread(threadId);
        }
        if (event.key === 'R' || event.key === 'r') {
            handleReply(threadId);
        }
    };

    return (
        <OneboxContainer>
            <Header>
                <Title>Onebox</Title>
                <NewThreadButton>+ New Thread</NewThreadButton>
            </Header>
            <ThreadList>
                {threads.map(thread => (
                    <ThreadItem
                        key={thread.id}
                        tabIndex={0}
                        onKeyDown={(event) => handleKeyDown(event, thread.id)}
                        onClick={() => handleReply(thread.id)}
                    >
                        <ThreadSubject>{thread.subject}</ThreadSubject>
                        <Actions>
                            <ReplyButton onClick={() => handleReply(thread.id)}>Reply</ReplyButton>
                            <DeleteButton onClick={() => deleteThread(thread.id)}>Delete</DeleteButton>
                        </Actions>
                    </ThreadItem>
                ))}
            </ThreadList>
        </OneboxContainer>
    );
};

// Styling Components

const OneboxContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  font-family: 'Arial', sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #ccc;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

const NewThreadButton = styled.button`
  background-color: #007BFF;
  color: #FFF;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ThreadList = styled.div`
  margin-top: 20px;
`;

const ThreadItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f9f9f9;
  }

  &:focus {
    outline: none;
    background-color: #f0f0f0;
  }
`;

const ThreadSubject = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
`;

const ReplyButton = styled.button`
  background-color: #28a745;
  color: #FFF;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

const DeleteButton = styled.button`
  background-color: transparent;
  color: #FF4D4F;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: color 0.3s ease;

  &:hover {
    color: #d32f2f;
  }
`;

export default Onebox;
