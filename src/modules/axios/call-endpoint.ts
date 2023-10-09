import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { addDisposer, IAnyStateTreeNode } from 'mobx-state-tree';
import { axiosInstance } from './axios-instance';
import { LuggoError, RequestState, State } from '.';

type CustomAxiosError = AxiosError<{ errors?: LuggoError[] }>;
export function isAxiosError(error?: unknown): error is Omit<
  CustomAxiosError,
  'response'
> & {
  response: AxiosResponse<{ errors: LuggoError[] }>;
} {
  const errors = (error as CustomAxiosError | undefined)?.response?.data.errors;
  return errors != null && errors.length > 0;
}

export function isLegacyError(error?: unknown): error is Omit<
  LegacyError,
  'response'
> & {
  response: AxiosResponse<LegacyError>;
} {
  const errors = (error as LegacyError | undefined)?.response?.data
    ?.error_description;
  return errors != null;
}

type LegacyError = {
  response?: {
    data?: {
      error: string;
      error_description?: string;
    };
  };
};

export async function* callEndpoint<DataType>({
  abort,
  config,
  store,

}: {
  abort?: () => void;
  config: Omit<AxiosRequestConfig, 'cancelToken'>;
  store?: IAnyStateTreeNode;

}): AsyncGenerator<RequestState<DataType>> {
  if (abort != null) {
    abort();
  }
  const cancelToken = axios.CancelToken.source();
  yield { state: State.Loading, abort: cancelToken.cancel };
  if (store) {
    addDisposer(store, cancelToken.cancel);
  }

  try {
    const data = (
      await axiosInstance({
        ...config,
        cancelToken: cancelToken.token,
      })
    ).data as DataType;
    yield { state: State.Success as const, data };
  } catch (error) {
    let responseError: { state: State.Error; error: LuggoError } | undefined;
    if (axios.isCancel(error)) {
      yield { state: State.Initial };
    } else if (isAxiosError(error)) {
      responseError = {
        error: error.response.data.errors[0],
        state: State.Error as const,
      };
    
    } else if (error instanceof Error) {
      responseError = {
        error: {
          code: 'unknown',
          detail: 'Generic error',
        },
        state: State.Error,
      };
    } else {
      responseError = {
        state: State.Error,
        error: {
          code: 'unknown',
          detail: 'Generic error',
        },
      };
    }
    if (responseError != null) {
      yield responseError;
    }
  }
}
