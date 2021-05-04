import React from 'react';
import { LoginReduxForm } from './LoginReduxForm';
import { login } from '../../redux/auth-reducer';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Login = ({ captchaUrl, login, isAuth }) => {
  // ---({ email, password, rememberMe, captcha } эти анные придут в клмпонент LOGIN после submit'a формы LoginForm
  const onSubmit = ({ email, password, rememberMe, captcha }) => {
    console.log(captcha);
    debugger;
    // отправляем собранные данные из формы в санку login
    login(email, password, rememberMe, captcha);
  };

  if (isAuth) {
    return <Redirect to={'/profile'} />;
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, {
  login,
})(Login);
