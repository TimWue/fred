const clientName = "TestApplication";
const redirectUris = "urn:ietf:wg:oauth:2.0:oob";
const scopes = "read write follow push";
const website = "https://myapp.example";
const grant_type_app_level_access = "client_credentials";
const grant_type_user_level_access = "authorization_code";
const response_type = "code";

export const registerApp = async (domain: string) => {
  let formData = new FormData();
  formData.append("client_name", clientName);
  formData.append("redirect_uris", redirectUris);
  formData.append("scopes", scopes);
  formData.append("website", website);

  const result = await fetch(`https://${domain}/api/v1/apps`, {
    body: formData,
    method: "post",
    mode: "cors",
    headers: {
      Accept: "application/json",
    },
  });

  return await result.json();
};

export const getAccessToken = async (
  domain: string,
  clientId: string,
  clientSecret: string,
  code?: string
) => {
  // if code is defined, we can get user-level access. otherwise app-level access will be granted
  let formData = new FormData();
  formData.append("client_id", clientId);
  formData.append("client_secret", clientSecret);
  formData.append("redirect_uri", redirectUris);
  formData.append("scope", scopes);
  formData.append(
    "grant_type",
    code ? grant_type_user_level_access : grant_type_app_level_access
  );
  code && formData.append("code", code);

  const result = await fetch(`https://${domain}/oauth/token`, {
    body: formData,
    method: "post",
    mode: "cors",
    headers: {
      Accept: "application/json",
    },
  });

  return await result.json();
};

export const verifyCredentials = async (domain: string, token: string) => {
  const result = await fetch(
    `https://${domain}/api/v1/apps/verify_credentials`,
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
  } else {
    console.warn("Token not verified");
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
