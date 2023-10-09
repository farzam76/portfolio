import { axiosInstance } from './axios-instance';

export { callEndpoint } from './call-endpoint';

export enum State {
  Initial = 'Initial',
  Loading = 'Loading',
  Success = 'Success',
  Error = 'Error',
}

export interface LuggoError {
  code: string;
  detail: string;
}

export interface LegacyError {
  error: string;
  error_description: string;
}

export type RequestState<DataType = unknown> =
  | {
      state: State.Initial;
      data?: undefined;
      error?: undefined;
      abort?: undefined;
    }
  | {
      state: State.Loading;
      data?: undefined;
      error?: undefined;
      abort: () => void;
    }
  | {
      state: State.Success;
      data: DataType;
      error?: undefined;
      abort?: undefined;
    }
  | {
      state: State.Error;
      data?: undefined;
      error: LuggoError;
      abort?: undefined;
    };

export default axiosInstance;
