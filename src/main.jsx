import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Reaction from './components/Reaction';
import GuessAndG from './components/GuessAndG';
import ProtectedRoute from './components/ProtectedRoute'; 
import CipherString from './components/CipherString'
import SequenceMemory from './components/SequenceMemory'
import store from './redux/store'
import { Provider } from 'react-redux'
import Score from './components/Score'
import Leaderboard from './pages/Leaderboard';
// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route
            path="/guess"
            element={
              <ProtectedRoute>
                <Score/>
                <GuessAndG />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reaction"
            element={
              <ProtectedRoute>
                <Score/>
                <Reaction />
              </ProtectedRoute>
            }
          />
          <Route
            path="/string-game"
            element={
              <ProtectedRoute>
                <Score/>
                <CipherString />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sequence-memory"
            element={
              <ProtectedRoute>
                <Score/>
                <SequenceMemory/>
              
              </ProtectedRoute>
            }
          />
          <Route
            path="/Leaderboard"
            element={
              <ProtectedRoute>
                
                <Leaderboard/>
              
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>

      </Provider>
      
    </ClerkProvider>
  </React.StrictMode>
);
