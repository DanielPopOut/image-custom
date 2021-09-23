export type ApiResponseFormat<T> = (
  | { success: true; data: T }
  | { success: false; error?: string }
) & {
  messages?: ApiResponseMessage[];
};

type ApiResponseMessage = { type: string; message: string };

export const ApiResponseSuccess = <T>(
  data: T,
  messages?: ApiResponseMessage[],
): ApiResponseFormat<T> => {
  return { success: true, data, messages };
};

export const ApiResponseError = <T>(
  error?: string,
  messages?: ApiResponseMessage[],
): ApiResponseFormat<T> => {
  return { success: false, error, messages };
};
