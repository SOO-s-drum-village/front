export type SortDirection = "ASC" | "DESC";

export type ErrorType<T> = {
  error: T | unknown;
};
