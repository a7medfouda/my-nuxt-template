import axios from "axios";

export default function (ctx: any) {
  const api: typeof axios = ctx.$axios;
  const login = async (payload: any) => {
    const response = await api.post("auth/recruiter/login", payload);
    return response.data.data;
  };
  const fetchUser = async () => {
    const response = await api.get("user");
    return response.data.data;
  };
  return {
    login,
    fetchUser,
  };
}
