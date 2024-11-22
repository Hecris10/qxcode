export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export type ServerRequest<T> = T & { serverError?: boolean };
