export class ResponseDTO<T> {
  data!: T;
  status: number = 0;
  message: string = '';
  constructor(data: T, status: number, message: string) {
    this.data = data;
    this.status = status;
    this.message = message;
  }
}

export interface UserDTO {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}
