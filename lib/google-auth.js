import { createRemoteJWKSet, jwtVerify } from 'jose';

const keys = createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'));
export const NONCE_COOKIE = 'll_google_nonce';
export const clearNonce = `${NONCE_COOKIE}=; HttpOnly; Secure; SameSite=Strict; Path=/api; Max-Age=0`;

export function nonceFromRequest(request) {
  return (request.headers.get('cookie') || '').split(';').map(v => v.trim())
    .find(v => v.startsWith(NONCE_COOKIE + '='))?.slice(NONCE_COOKIE.length + 1);
}

export async function verifyGoogleCredential(credential, clientId, nonce, keySet = keys) {
  if (typeof credential !== 'string' || credential.length > 8192 || !clientId || !nonce || !/^[a-f0-9]{64}$/.test(nonce))
    throw new Error('Invalid Google credential');
  const { payload } = await jwtVerify(credential, keySet, {
    algorithms: ['RS256'], audience: clientId,
    issuer: ['https://accounts.google.com', 'accounts.google.com'],
    requiredClaims: ['sub', 'email', 'email_verified', 'exp', 'iat', 'nonce'], maxTokenAge: '10m',
  });
  if (payload.nonce !== nonce || payload.email_verified !== true || typeof payload.sub !== 'string' || !payload.sub)
    throw new Error('Invalid Google identity');
  return payload;
}
