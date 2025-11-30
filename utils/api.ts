export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';
export const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || '';

export const getBaseUrl = (endpoint: string): string => {
  return `/${API_VERSION}${
    endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  }`;
};
