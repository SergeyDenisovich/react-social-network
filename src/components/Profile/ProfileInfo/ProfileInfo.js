import React, { useState } from 'react';
import styles from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
// import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/user.png';
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = ({
  profile,
  status,
  updateStatus,
  isOwner,
  savePhoto,
  saveProfile,
}) => {
  let [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData) => {
    saveProfile(formData).then(() => {
      setEditMode(false);
    });
  };

  return (
    <div>
      <div className={styles.description_block}>
        <img
          src={profile.photos.large || userPhoto}
          alt='profile_photo'
          className={styles.main_photo}
        />

        {/* если отображается профиль зарегистрированного пользователя, то показать кнопку для загрузки фото */}
        {isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}

        {/* если включен режим editMode в true - показать редактируемые поля ввода данных иначе инфу с сервера */}
        {editMode ? (
          <ProfileDataForm
            initialValues={profile} // with props initialValues поля будут проинициированы с начальными значениями
            onSubmit={onSubmit}
            profile={profile}
          />
        ) : (
          <ProfileData
            goToEditMode={() => {
              setEditMode(true);
            }}
            profile={profile}
            isOwner={isOwner}
          />
        )}
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  );
};

// ================================
// Компонента ProfileData отображает статические данные отображаемого профиля с сервера
const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return (
    <div>
      {isOwner && (
        <div>
          <button onClick={goToEditMode}>edit</button>
        </div>
      )}
      <div>
        <b>Full name:</b> {profile.fullName}
      </div>
      <div>
        <b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
      </div>
      {profile.lookingForAJob && (
        <div>
          <b>My professional skills:</b> {profile.lookingForAJobDescription}
        </div>
      )}
      <div>
        <b>About me:</b> {profile.aboutMe}
      </div>
      <div>
        <b>Contacts:</b>{' '}
        {Object.keys(profile.contacts).map((key) => {
          return (
            <Contact
              key={key}
              contactTitle={key}
              contactValue={profile.contacts[key]}
            />
          );
        })}
      </div>
    </div>
  );
};

// =======================
// Компонента Contact показывает элементы списка контактов отображаемого профиля (соц. сети)
const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div className={styles.contact}>
      <b>{contactTitle}:</b> {contactValue}
    </div>
  );
};

export default ProfileInfo;
