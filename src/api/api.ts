import axios from 'axios';
import { ProfileType } from '../types/type';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': 'd5f8992d-7036-472d-ba45-bf81737167f0',
  },
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`).then((response) => response.data);
  },
  unfollow(userId: number) {
    return instance.delete(`follow/${userId}`).then((response) => response.data);
  },
  follow(userId: number) {
    return instance.post(`follow/${userId}`).then((response) => response.data);
  },
  getProfile(userId: number) {
    console.warn('obsolete method. Please use profileAPI object');
    return profileAPI.getProfile(userId);
  },
};

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get(`profile/${userId}`).then((response) => response.data);
  },

  getStatus(userId: number) {
    return instance.get(`profile/status/` + userId);
  },

  updateStatus(status: string) {
    return instance.put(`profile/status`, { status: status });
  },

  savePhoto(photoFile: any) {
    let formData = new FormData();
    formData.append('image', photoFile);
    return instance
      .put(`profile/photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response.data);
  },

  saveProfile(profile: ProfileType) {
    return instance.put(`profile`, profile);
  },
};

// --- typing
export enum EnumResultCode {
  Success = 0,
  Error = 1,
}

export enum ResultCodeForCapcha {
  CapchaIsRequired = 10,
}
type MeResponseType = {
  data: {
    id: number;
    email: string;
    login: string;
  };
  resultCode: EnumResultCode;
  messages: Array<string>;
};
type LoginResponseType = {
  data: {
    id: number;
  };
  resultCode: EnumResultCode | ResultCodeForCapcha;
  messages: Array<string>;
};
export const authAPI = {
  me() {
    return instance.get<MeResponseType>(`auth/me`).then((response) => response.data); // вернем промис в auth-reducer (проверка логинизации пользователя)
  },

  login(email: string, password: string, rememberMe = false, captcha: string | null) {
    return instance
      .post<LoginResponseType>(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((res) => res.data);
  },

  logout() {
    return instance.delete(`auth/login`);
  },
};

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`);
  },
};
