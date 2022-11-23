const clientName = "TestApplication";
const redirectUris = "urn:ietf:wg:oauth:2.0:oob";
const scopes = "read write follow push";
const website = "https://myapp.example";
const grant_type_app_level_access = "client_credentials";
const grant_type_user_level_access = "authorization_code";
const response_type = "code";

export const verifyCredentials = async (domain: string, token: string) => {
  const result = await fetch(
    `https://${domain}/api/v1/accounts/verify_credentials`,
    {
      method: "get",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (result.ok) {
    console.log("Successfully verified token");
    return await result.json();
  } else {
    throw new Error("Token not verified");
  }
};

export const authorize = async (domain: string, clientId: string) => {
  const queryParams = new URLSearchParams();
  queryParams.append("client_id", clientId);
  queryParams.append("scope", "read");
  queryParams.append("redirect_uri", redirectUris);
  queryParams.append("response_type", response_type);
  window.location.href = `https://${domain}/oauth/authorize?` + queryParams;
  // const result = await fetch(
  //   `https://${domain}/oauth/authorize?` + queryParams,
  //   {
  //     method: "get",
  //     mode: "no-cors",
  //   }
  // );
  //
  // console.log(result);
  //
  // if (result.ok) {
  //   console.log("Successfully authorized");
  // } else {
  //   console.warn(" Authorization failed");
  // }
};
