import { respond, validOrigin, error } from '../../lib/server-utils.js';
import { NONCE_COOKIE } from '../../lib/google-auth.js';

export function onRequestGet({ env, request }) {
  if (!validOrigin(request)) return error('허용되지 않은 요청입니다.', 403);
  const clientId = env.GOOGLE_CLIENT_ID || '';
  const nonce = Array.from(crypto.getRandomValues(new Uint8Array(32)), b => b.toString(16).padStart(2, '0')).join('');
  return respond({ googleClientId: clientId, nonce, registrationOpen: env.REGISTRATION_OPEN === 'true' }, 200, {
    'Set-Cookie': `${NONCE_COOKIE}=${nonce}; HttpOnly; Secure; SameSite=Strict; Path=/api; Max-Age=600`,
  });
}
