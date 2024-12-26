import { httpAxios } from "@/helper/httpHelper";

export async function login(loginData) {
  const result = await httpAxios
    .post("/api/admin", loginData)
    .then((response) => response.data);

  return result;
}

export async function 