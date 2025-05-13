export function useApiFetch<T>(
  url: string | (() => string),
  options: Record<string, unknown> = {},
) {
  return useFetch<T>(url, {
    ...options,
    onRequest({ request, options }) {
      // These console are for debugging purposes
      console.log("options: ", options);
      console.log("request: ", request);
    },
    onResponse({ response }) {
      return response;
    },
    onRequestError({ error }) {
      // This console is for debugging purposes
      console.log("error: ", error);
      return {
        error: {
          statusCode: 500,
          statusMessage: "Network Error",
          data: { message: "Failed to connect to the server" },
        },
      };
    },
    onResponseError({ response }) {
      const responseData = response._data || {};
      const error = {
        statusCode: responseData.statusCode || response.status,
        statusText: responseData.statusMessage || response.statusText,
        message: responseData.message || "An unknown error occurred",
        data: response._data?.data?.message || {
          message: "An unknown error occurred",
        },
      };

      return { error };
    },
  });
}
