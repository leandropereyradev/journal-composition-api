// export const myAction = async ({commit}) => {}

import authAPI from "@/api/authAPI";

export const createUser = async ({ commit }, user) => {
  const { name, email, password } = user;

  try {
    const { data } = await authAPI.post(":signUp", {
      email,
      password,
      returnSecureToken: true,
    });

    const { idToken, refreshToken } = data;

    await authAPI.post(":update", { displayName: name, idToken });

    delete user.password;

    commit("registerUser", { user, idToken, refreshToken });

    return { ok: true };
  } catch (error) {
    console.log(error.response);
    return { ok: false, message: error.response.data.error.message };
  }
};

export const signInUser = async ({ commit }, user) => {
  const { email, password } = user;

  try {
    const { data } = await authAPI.post(":signInWithPassword", {
      email,
      password,
      returnSecureToken: true,
    });

    const { displayName, idToken, refreshToken } = data;

    user.name = displayName;

    //Usamos registerUser porque es lo mismo
    commit("loginUser", { user, idToken, refreshToken });

    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data.error.message };
  }
};
