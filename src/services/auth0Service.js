import auth0 from "auth0-js";

export const webAuth = new auth0.WebAuth({
  domain: process.env.REACT_APP_DOMAIN,
  clientID: process.env.REACT_APP_CLIENT_ID,
  responseType: "token id_token",
  redirectUri: `${window.location.origin}/authorize`,
  scope: "openid profile",
});

export const sendMailStart = ({ email }) => {
  return new Promise((resolve, reject) => {
    const variables = { email, connection: "email", send: "link" };
    webAuth.passwordlessStart(variables, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

export const logout = () => {
  localStorage.clear();
  webAuth.logout({
    returnTo: `${window.location.origin}/login`,
    clientID: process.env.REACT_APP_CLIENT_ID,
  });
};
