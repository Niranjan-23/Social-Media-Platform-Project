import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Nav from './Nav';
import Post from './Post';
import LoginPage from './LoginPage';
import './App.css';
import AddPost from './AddPost';
import Search from './Search';
import Notification from './Notification';
import SignUp from './SignUp';
import Profile from './Profile';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Avatar } from '@mui/material';

// Helper functions for local storage
const getUsersFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('users')) || [];
};

const getLoggedInUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('loggedInUser')) || null;
};

const saveUsersToLocalStorage = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

const App = () => {
  const [users, setUsers] = useState(getUsersFromLocalStorage());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(getLoggedInUserFromLocalStorage());
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    saveUsersToLocalStorage(users);
  }, [users]);

  const handleLogin = (email, password) => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      setLoggedInUser(user);
      setIsLoggedIn(true);
      // Save the logged-in user to localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(user));
    } else {
      alert('Invalid email or password!');
    }
  };

  const handleSignUp = (newUser) => {
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setLoggedInUser(newUser);
    setIsLoggedIn(true);
    // Save the logged-in user to localStorage
    localStorage.setItem('loggedInUser', JSON.stringify(newUser));
  };

  const handleAddPost = (postUrl) => {
    if (!loggedInUser) return;
    const updatedUser = {
      ...loggedInUser,
      posts: [...loggedInUser.posts, postUrl],
    };
    setLoggedInUser(updatedUser);
    const updatedUsers = users.map((u) =>
      u.email === updatedUser.email ? updatedUser : u
    );
    setUsers(updatedUsers);
  };

  const handleUpdateUser = (updatedUser) => {
    setLoggedInUser(updatedUser);
    const updatedUsers = users.map((u) =>
      u.email === updatedUser.email ? updatedUser : u
    );
    setUsers(updatedUsers);
    // Update the logged-in user in localStorage
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('loggedInUser'); // Remove user from localStorage on logout
  };

  // Local Route Components
  const Home = () => (
    <div className="posts-container">
      <Post postId="post1" />
      <Post postId="post2" />
    </div>
  );

  const NewPost = () => (
    <div className="posts-container">
      <AddPost loggedInUser={loggedInUser} onAddPost={handleAddPost} />
    </div>
  );

  const SearchProfile = () => (
    <div className="posts-container">
      <Search />
    </div>
  );

  const Noti = () => (
    <div className="posts-container">
      <Notification />
    </div>
  );

  const ProfileComp = () => (
    <div className="posts-container">
      <Profile user={loggedInUser} onUpdateUser={handleUpdateUser} />
    </div>
  );

  return (
    <Router>
      {!isLoggedIn ? (
        <div className="fullscreen-login">
          <Routes>
            <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/SignUp" element={<SignUp onSignUp={handleSignUp} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      ) : (
        <div className={isDarkMode ? 'app-container dark' : 'app-container light'}>
          <Nav />
          <div className="main-content">
            <div className="toolbar">
              <Button onClick={toggleTheme} variant="outlined" color="inherit">
                {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </Button>
              <Button onClick={handleLogout} variant="outlined" color="inherit">
                <Avatar
                  alt={loggedInUser?.name || 'User'}
                  src={loggedInUser?.avatar || '/default-avatar.png'}  // Fallback to default if avatar is missing
                  className="avatar"
                />
                Logout
              </Button>
            </div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Notification" element={<Noti />} />
              <Route path="/Add-post" element={<NewPost />} />
              <Route path="/Search" element={<SearchProfile />} />
              <Route path="/ProfileSetting" element={<ProfileComp />} />
              <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
          </div>
        </div>
      )}
    </Router>
  );
};

export default App;
