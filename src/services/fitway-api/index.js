import { client } from "./config";

//FEATHERS SERVICES
export const users = client.service("users");
export const categories = client.service("products-categories");
export const products = client.service("products");

// AUTH METHODS
export const login = async payload => {
  try {
    // First try to log in with an JWT
    return await client.reAuthenticate();
  } catch (error) {
    // If that errors, log in with email/password
    //     // Here we would normally show a login page
    //     // to get the login information
    return await client.authenticate({
      ...payload,
      strategy: "local"
    });
  }
};

export const logout = async () => {
  return await client.logout();
};
