export class ApiResponseDto<T> {
  status: number;
  data: T | null;
  success: boolean;
  error: string | null;

  constructor(
    status: number,
    success: boolean,
    data: T | null,
    error: string | null,
  ) {
    this.status = status;
    this.success = success;
    this.data = data;
    this.error = error;
  }
}
