export default function makeResponse(message: any, isError?: boolean) {
  return {
    status: isError ? "error" : "success",
    isError: isError ?? false,
    data: message,
  };
}
