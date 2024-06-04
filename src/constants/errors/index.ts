type HttpErrorType = {
  name: "HttpError";
  status: number;
  message: string;
  // これより下のプロパティはプロジェクトのエラーがどういう形式かによる
  details?: {
    code: number;
    message: string;
  }[];
};

export class HttpError extends Error {
  status: HttpErrorType["status"];

  details: HttpErrorType["details"];

  constructor(message: HttpErrorType["message"], { status, details }: Omit<HttpErrorType, "name" | "message">) {
    super(message);
    this.name = "HttpError";
    this.status = status || 500;
    this.details = details;
  }

  toJSON(): HttpErrorType {
    const result = {};
    Object.getOwnPropertyNames(this).forEach((key) => {
      // @ts-ignore
      result[key] = this[key];
    });
    return result as HttpErrorType;
  }
}
