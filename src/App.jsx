import './App.css'
import Home from './pages/home/Home'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Dashboard from './pages/dashboard/Dashboard'
import Models from './pages/models/Models'
import ModelDetail from './pages/models/ModelDetail'
import Billing from './pages/billing/Billing'
import Checkout from './pages/checkout/Checkout'
import Navbar from './components/Navbar'
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

function AppRoutes() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        backgroundColor: '#000000',
        color: '#ffffff'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate to="/login" replace />}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route 
          path='/home' 
          element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }
        />
        <Route 
          path='/dashboard' 
          element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          }
        />
        <Route 
          path='/models' 
          element={
            <ProtectedRoute>
              <Models/>
            </ProtectedRoute>
          }
        />
        <Route 
          path='/models/:modelId' 
          element={
            <ProtectedRoute>
              <ModelDetail/>
            </ProtectedRoute>
          }
        />
        <Route 
          path='/billing' 
          element={
            <ProtectedRoute>
              <Billing/>
            </ProtectedRoute>
          }
        />
        <Route 
          path='/checkout' 
          element={
            <ProtectedRoute>
              <Checkout/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}

export default App
