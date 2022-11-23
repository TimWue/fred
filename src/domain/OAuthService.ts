import {
  authorize,
  getAccessToken,
  registerApp,
  verifyCredentials,
} from "./OAuthRepository";

export const OAuthService = {
  register: async (domain: string) => {
    const app = await registerApp(domain);
    localStorage.setItem("app", JSON.stringify(app));
    const token = await getAccessToken(
      domain,
      app.client_id,
      app.client_secret
    );
    localStorage.setItem("token", JSON.stringify(token));
    await verifyCredentials(domain, token.access_token);
  },

  authorize: async (domain: string) => {
    const app = getApp();
    const clientId = app.client_id;
    console.log(clientId);
    await authorize(domain, clientId);
  },
  async setAuthorizationCode(domain: string, code: string) {
    // Set code received after signing in at server
    localStorage.setItem("code", code);

    const app = getApp();
    const token = await getAccessToken(
      domain,
      app.client_id,
      app.client_secret,
      code
    );
    localStorage.setItem("token", JSON.stringify(token));
    await verifyCredentials(domain, token.access_token);
  },
};

const getApp = () => {
  const appSerialized = localStorage.getItem("app");
  if (!appSerialized) {
    throw new Error("App not registered.");
  }
  return JSON.parse(appSerialized);
};
