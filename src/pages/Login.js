import React, { useContext, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { TextField, Box, Stack, Typography } from '@mui/material';
import AppContext from '../context/AppContext';
import loginLogo from '../images/loginLogo.svg';
import loginImage from '../images/loginImage.svg';

function Login() {
  const {
    setEmail,
    password,
    setPassword,
    isDisabled,
    setIsDisabled,
    email,
  } = useContext(AppContext);
  const history = useHistory();

  const validaEmailPassword = useCallback(() => {
    const CHARAC_MIN = 6;
    const regex = /\S+@\S+\.\S+/;
    const validaEmail = regex.test(email);
    const validaPassword = password.length > CHARAC_MIN;
    const validarInputs = !(validaEmail && validaPassword);
    setIsDisabled(validarInputs);
  }, [email, password, setIsDisabled]);

  const handleChangeEmail = ({ target }) => {
    setEmail(target.value);
  };

  const handleChangePassword = ({ target }) => {
    setPassword(target.value);
  };
  const clickSubmit = useCallback(() => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktaislToken', '1');
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  }, [email, history]);

  useEffect(() => {
    validaEmailPassword();
  }, [email, password, validaEmailPassword]);

  return (
    <Box
      component="main"
      sx={ {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        minHeight: '100vh',
        background: 'linear-gradient(#41197F 50%, #F5F5F5 50%)',
      } }
    >
      <img width={ 198 } src={ loginLogo } alt="login-logo" />

      <img className="tomato-image" src={ loginImage } alt="login-logo" />
      <Stack
        spacing={ 1 }
        component="form"
        sx={ {
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        } }
      >
        <Typography
          variant="h5"
          color="secondary"
        >
          LOGIN
        </Typography>

        <TextField
          id="email"
          type="email"
          label="Email"
          data-testid="email-input"
          onChange={ handleChangeEmail }
          variant="outlined"
          size="small"
        />
        <TextField
          id="password"
          type="password"
          label="Senha"
          data-testid="password-input"
          onChange={ handleChangePassword }
          variant="outlined"
          size="small"
        />
        <Button
          type="button"
          className="btn-login"
          data-testid="login-submit-btn"
          disabled={ isDisabled }
          onClick={ clickSubmit }
          variant="contained"
          endIcon={ <SendIcon /> }
          fullWidth
        >
          Enter
        </Button>

      </Stack>
    </Box>

  );
}

export default Login;
