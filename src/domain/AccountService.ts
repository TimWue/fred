import { verifyCredentials } from "./AccountRepository";

export const AccountService = {
  async verifyAccount(domain: string) {
    const token = getToken();
    return await verifyCredentials(domain, token.access_token);
  },
};

const getToken = () => {
  const tokenSerialized = localStorage.getItem("token");
  if (!tokenSerialized) {
    throw new Error("No token available.");
  }
  return JSON.parse(tokenSerialized);
};
