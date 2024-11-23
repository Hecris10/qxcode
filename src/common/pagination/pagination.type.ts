export interface PaginatedData<T> {
  total: number;
  data: T[];
  page: string;
  limit: string;
}
