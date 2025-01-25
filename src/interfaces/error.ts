export type TErrorSources = {
  path: string | number;
  message: string;
}[];

export type TErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};
