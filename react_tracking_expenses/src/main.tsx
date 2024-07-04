import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login.tsx';
import Register from './components/Register.tsx';
import { Typography } from '@mui/material';
import { IsUser } from './context/IsUser.ts';
import { IsChange } from './context/IsChange.ts';
import { IUserInfo, UserInfo } from './context/UserInfo.ts';
import axios from 'axios';
import Profile from './components/Profile.tsx';
import AlreadyUser from './components/AlreadyUser.tsx';
import { ITransactions, TransactionsInfo } from './context/TransactionsInfo.ts';

function Root() {
  const [isUser, setIsUser] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [userInfo, setUserInfo] = useState<IUserInfo>({ first_name: '', last_name: '', email: '', username: '' });
  const [transactions, setTransactions] = useState<ITransactions[]>([])

  const handleUserInfo = () => {
    axios.get('/api/auth/me')
      .then((response) => {
        if (response?.data?.message) {
          setIsUser(true);
          setUserInfo(response.data.message);
        }
      })
      .catch(() => {
        // console.error(error);
        setIsUser(false);
        setUserInfo({ first_name: '', last_name: '', email: '', username: '' });
      });
  };

  const handleTransactions = () => {
    axios.get('/api/transactions')
      .then((e) => {
        console.log(e.data.message)
        if (e.data.message) {
          setTransactions(e.data.message)
        }
      })
      .catch((err) => {
        console.log(err)
        setTransactions([])
      })
  }

  useEffect(() => {
    handleUserInfo();
    handleTransactions()
    setIsChange(false)
  }, [isChange, isUser]);

  return (
    <React.StrictMode>
      <Typography
        component={'div'}
        sx={{
          minHeight: '100dvh',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <IsChange.Provider value={{ isChange, setIsChange }}>
          <IsUser.Provider value={{ isUser, setIsUser }}>
            <UserInfo.Provider value={{ userInfo, setUserInfo }}>
              <TransactionsInfo.Provider value={{ transactions, setTransactions }}>
                <BrowserRouter>
                  <Header />
                  <Routes>
                    <Route path={'/'} element={<App />} />
                    {!isUser ? <Route path={'/login'} element={<Login />} /> : <Route path={'/login'} element={<AlreadyUser />} />}
                    {!isUser ? <Route path={'/register'} element={<Register />} /> : <Route path={'/register'} element={<AlreadyUser />} />}
                    {isUser && <Route path={'/profile'} element={<Profile />} />}
                  </Routes>
                  <Footer />
                </BrowserRouter>
              </TransactionsInfo.Provider>
            </UserInfo.Provider>
          </IsUser.Provider>
        </IsChange.Provider>
      </Typography>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
