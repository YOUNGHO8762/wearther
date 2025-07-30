export interface ClientError {
  response: {
    data: {
      error: string;
    };
  };
}

export interface ServerError {
  response: {
    data: {
      error_message?: string;
      message?: string;
    };
    status: number;
  };
}
