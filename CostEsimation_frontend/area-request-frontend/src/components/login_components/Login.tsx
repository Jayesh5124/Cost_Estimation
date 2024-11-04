
import { Box, Typography, TextField, Button, Radio, RadioGroup, FormControlLabel, Link } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface User {
  email: string;
  name: string;
  password: string;
  userType: string;
  userId: number;
}

interface LoginFormProps {
  onLogin: (userType: 'user' | 'constructor') => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'user' | 'constructor'>('user');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the context

  const handleLogin = async () => {
    try {
      const response=await login(email, password, userType); // Call login from context
   
      alert(`Login successful! Welcome ${userType}`);
      console.log(response);
      
      navigate(userType === 'user' ? '/property_details' : '/list_property');
    } catch (error) {
      setError('Invalid email or AA password');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '73vh', backgroundColor: '#f0f0f0', padding: '2rem' }}>
      <Box sx={{ backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', padding: '2.5rem', width: '100%', maxWidth: '400px' }}>
        <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold">
          Login
        </Typography>
        
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          sx={{ marginBottom: '1rem' }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          sx={{ marginBottom: '1rem' }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <RadioGroup value={userType} onChange={(e) => setUserType(e.target.value as 'user' | 'constructor')} sx={{ marginBottom: '1rem' }}>
          <FormControlLabel value="user" control={<Radio />} label="User" />
          <FormControlLabel value="constructor" control={<Radio />} label="Constructor" />
        </RadioGroup>

        <Button onClick={handleLogin} variant="contained" color="primary" fullWidth sx={{ padding: '0.75rem', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Login
        </Button>

        <Typography variant="body2" color="textSecondary" align="center">
          Don't have an account? <Link href="/registration">Register</Link>
        </Typography>

        {error && (
          <Typography color="error" textAlign="center" sx={{ marginTop: '1rem' }}>
            {error}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default LoginForm;
