import { reduxForm } from 'redux-form';
import { LoginForm } from './LoginForm';

export const LoginReduxForm = reduxForm({
  form: 'login',
})(LoginForm);
