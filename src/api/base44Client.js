import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

let base44;
try {
  base44 = createClient({
    appId,
    token,
    functionsVersion,
    serverUrl: '',
    requiresAuth: false,
    appBaseUrl,
  });
} catch (e) {
  // createClient can throw a SecurityError when localStorage is blocked.
  // This only affects the portal; the public website doesn't use this client.
  console.warn('[CFDE] Base44 client unavailable:', e.message);
  base44 = {
    auth: {
      me: () => Promise.reject(new Error('Auth unavailable')),
      logout: () => {},
      redirectToLogin: () => {},
    },
    entities: new Proxy({}, {
      get: () => new Proxy({}, { get: () => () => Promise.reject(new Error('Client unavailable')) }),
    }),
    functions: { invoke: () => Promise.reject(new Error('Client unavailable')) },
  };
}

export { base44 };
