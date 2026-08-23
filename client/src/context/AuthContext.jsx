import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('algoinsight_auth_token'));
  const [loading, setLoading] = useState(true);

  // Check token and fetch user on load
  useEffect(() => {
    const fetchMe = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        } else {
          // If token is invalid, clear session
          localStorage.removeItem('algoinsight_auth_token');
          setToken(null);
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, [token]);

  // Signup
  const signup = async (name, email, password) => {
    const res = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Signup failed');
    }

    localStorage.setItem('algoinsight_auth_token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  // Login
  const login = async (email, password) => {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Login failed');
    }

    localStorage.setItem('algoinsight_auth_token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('algoinsight_auth_token');
    setToken(null);
    setUser(null);
  };

  // Sync progress
  const syncProgress = async (completions, highScores, streak) => {
    if (!token) return;

    try {
      const res = await fetch('http://localhost:5000/api/auth/sync-progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ completions, highScores, streak })
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setUser(updatedUser);
        return updatedUser;
      }
    } catch (error) {
      console.error('Failed to sync progress:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signup, login, logout, syncProgress }}>
      {children}
    </AuthContext.Provider>
  );
};
