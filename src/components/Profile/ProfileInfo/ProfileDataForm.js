import React from 'react';
import styles from './ProfileInfo.module.css';
import { reduxForm } from 'redux-form';
import {
  createField,
  Input,
  Textarea,
} from '../../common/FormsControls/FormsControls';

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
  // props error pass from redux-form

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button>save</button>

        {/* если на сервер попали некорректные данные и они же вернулись в этот компонент - покажи блок с ошибкой */}
        {error && <div className={styles.form_summary_error}>{error}</div>}
      </div>
      <div>
        <b>Full name:</b> {createField('Full name', 'fullName', [], Input)}
      </div>
      <div>
        <b>Looking for a job:</b>
        {createField('', 'lookingForAJob', [], Input, { type: 'checkbox' })}
      </div>

      <div>
        <b>My professional skills:</b>
        {createField(
          'My professional skills',
          'lookingForAJobDescription',
          [],
          Textarea
        )}
      </div>

      <div>
        <b>About me:</b>
        {createField('About me', 'aboutMe', [], Textarea)}
      </div>
      <div>
        <b>Contacts:</b>{' '}
        {Object.keys(profile.contacts).map((key) => {
          return (
            <div className={styles.contact} key={key}>
              <b>{key}:</b> {createField(key, 'contacts.' + key, [], Input)}
            </div>
          );
        })}
      </div>
    </form>
  );
};

const ProfileDataFormReduxForm = reduxForm({ form: 'edit-profile' })(
  ProfileDataForm
);

export default ProfileDataFormReduxForm;
