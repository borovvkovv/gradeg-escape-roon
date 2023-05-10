import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from 'axios';
import { getToken } from './token';
import {StatusCodes} from 'http-status-codes';
import { toast } from 'react-toastify';

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayError = (response: AxiosResponse) => StatusCodeMapping[response.status];

const BASE_URL = 'https://grading.design.pages.academy/v1/escape-room';
const TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {

    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{message: string; details: [{messages: [string]}]}>) => {
      if (error.response && shouldDisplayError(error.response)) {
        switch (error.response.status) {
          case StatusCodes.BAD_REQUEST:
            toast.warn('Неудачная попытка');
            break;
          case StatusCodes.UNAUTHORIZED:
            toast.warn('Вы не авторизованы');
            break;
          case StatusCodes.NOT_FOUND:
            toast.warn('Ошибка загрузки данных');
            break;
          default:
            toast.warn(error.message);
            break;
        }
      }

      throw error;
    }
  );

  return api;
};
