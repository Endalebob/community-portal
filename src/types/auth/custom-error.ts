export interface CustomError {
  data: { isSuccess: boolean; error: Error[]; value: null; message: string };
}

export interface Error {
  propertyName: string;
  errorMessage: string;
  attemptedValue: string;
  customState: null;
  severity: number;
  errorCode: string;
}
