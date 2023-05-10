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
      if (error.response?.data.message && shouldDisplayError(error.response)) {
        if (error.response.status === StatusCodes.UNAUTHORIZED) {
          toast.warn('Вы не авторизованы');
        }
        else {
          toast.warn(error.response.data.message);
        }
      }

      if (error.response?.data.details && shouldDisplayError(error.response)) {
        error.response.data.details.forEach((detail) =>
          detail.messages.forEach((message) => toast.warn(message))
        );
      }

      throw error;
    }
  );

  return api;
};
