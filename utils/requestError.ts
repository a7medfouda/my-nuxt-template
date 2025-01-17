export default function (error: any) {
  const msg = error?.response?.data?.message;
  return { title: "An Error has occurred", msg: msg ? msg : error };
}
