import { TErrorSources } from "../interface/error";

const handleDuplicateError = (err: any) => {
  const erroSource: TErrorSources = [
    {
      path: "",
      message: `${err.errmsg} is already Exist`,
    },
  ];
  const statusCode = 500;
  return {
    statusCode,
    message: err?.message,
    erroSource: erroSource,
  };
};
export default handleDuplicateError;
