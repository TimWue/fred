import {
  ChangeEvent,
  ChangeEventHandler,
  FunctionComponent,
  useState,
} from "react";
import { registerApp } from "../domain/OAuthRepository";
import { OAuthService } from "../domain/OAuthService";
import { AccountService } from "../domain/AccountService";

export const RegisterServer: FunctionComponent = () => {
  const [domain, setDomain] = useState("");
  const [code, setCode] = useState("");
  const [account, setAccount] = useState("");

  const changeDomain = (event: ChangeEvent<HTMLInputElement>) => {
    setDomain(event.currentTarget.value);
  };
  const changeCode = (event: ChangeEvent<HTMLInputElement>) => {
    setCode(event.currentTarget.value);
  };
  return (
    <>
      <div>
        <input
          placeholder={"server domain"}
          value={domain}
          onChange={changeDomain}
        />
        <button onClick={() => OAuthService.register(domain)}>Register</button>
        <button onClick={() => OAuthService.authorize(domain)}>
          Authorize
        </button>
      </div>
      <div>
        <input
          placeholder={"authorization code"}
          value={code}
          onChange={changeCode}
        />
        <button onClick={() => OAuthService.setAuthorizationCode(domain, code)}>
          Set Code
        </button>
      </div>
      <div>
        <button
          onClick={async () => {
            const account = await AccountService.verifyAccount(domain);
            console.log(account);
            setAccount(JSON.stringify(account));
          }}
        >
          Verify Account
        </button>
        {account}
      </div>
    </>
  );
};
