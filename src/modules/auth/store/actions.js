// export const myAction = async ({commit}) => {}

import authAPI from "@/api/authAPI";

export const createUser = async ({ commit }, user) => {
  const { name, email, password } = user;

  console.log(name, email, password);

  try {
    const { data } = await authAPI.post(":signUp", {
      email,
      password,
      returnSecureToken: true,
    });

    const { idToken, refreshToken } = data;

    const resp = await authAPI.post(":update", { displayName: name, idToken });

    console.log(resp);

    // console.log(data);

    return { ok: true };
  } catch (error) {
    console.log(error.response);
    return { ok: false, message: error.response.data.error.message };
  }
};
