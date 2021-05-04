import React from 'react';
import { Input, createField } from '../common/FormsControls/FormsControls';
import { required } from '../../utils/validators/validators';
import styles from '../common/FormsControls/FormControls.module.css';

export const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField('Email', 'email', [required], Input)}
      {/* <div>
                  <Field
                      placeholder={'Email'}
                      name={'email'}
                      validate={[required]}
                      component={Input}
                  />
              </div> */}
      {createField('Password', 'password', [required], Input, {
        type: 'password',
      })}
      {createField(
        null,
        'rememberMe',
        null,
        Input,
        { type: 'checkbox' },
        'remember me'
      )}
      {/* <div>
                  <Field
                      placeholder={'Password'}
                      name={'password'}
                      validate={[required]}
                      component={Input}
                      type={'password'}
                  />
              </div>
              <div>
                  <Field component={Input} name={'rememberMe'} type={'checkbox'} /> запомнить
                  пользователя
              </div> */}

      {captchaUrl && <img src={captchaUrl} alt='captcha' />}

      {captchaUrl &&
        createField('Symbols from image', 'captcha', [required], Input)}
      {error && <div className={styles.form_summary_error}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};
