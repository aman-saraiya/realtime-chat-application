module.exports = {
  type: "service_account",
  project_id: process.env.FIREBASE_SERVICE_ACCOUNT_project_id,
  private_key_id: process.env.FIREBASE_SERVICE_ACCOUNT_private_key_id,
  private_key: process.env.FIREBASE_SERVICE_ACCOUNT_private_key,
  client_email: process.env.FIREBASE_SERVICE_ACCOUNT_client_email,
  client_id: process.env.FIREBASE_SERVICE_ACCOUNT_client_id,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    process.env.FIREBASE_SERVICE_ACCOUNT_client_x509_cert_url,
};
