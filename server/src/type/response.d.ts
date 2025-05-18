export interface TypedResponse<T> {
    status: string;
    data?: T;
    message?: string;
}
  