// this code to be deployed to main domain where cookies are stored and authorization happens
// this is cloudflare worker

const ACCEPTED_REFERRERS = [ // these are the domains where cookies are read
    'https://neyraspace.xyz',
    'https://neyraspace.online',
    'https://neyraspace.com',
];
const CHECK_REFERRER = false; // Must be enabled for production!!!!


// Time to live (TTL) for access token refresh (in seconds)
const TOKEN_REFRESH_TTL = 120;

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const cookies = request.headers.get('Cookie') || '';
        const currentDomain = url.hostname;
        const NEYRA_API_ENDPOINT = `https://api.${currentDomain}/api`;

        // Parse cookies
        const cookieMap = new Map(cookies.split(';').map(cookie => {
            const [name, ...rest] = cookie.split('=');
            return [name.trim(), decodeURIComponent(rest.join('='))];
        }));

        let accessToken = cookieMap.get('access_token') || '';
        let refreshToken = cookieMap.get('refresh_token') || '';

        // Check referer header if CHECK_REFERRER is true
        if (CHECK_REFERRER) {
            const referer = request.headers.get('Referer') || '';
            if (!ACCEPTED_REFERRERS.includes(referer)) {
                return new Response('Referer not accepted', { status: 403 });
            }
        }

        // Determine allowed origin
        let origin = request.headers.get('Origin');
        if (!origin) {
            const referer = request.headers.get('Referer');
            if (referer) {
                const refererUrl = new URL(referer);
                origin = `${refererUrl.protocol}//${refererUrl.hostname}`;
            }
        }

        const allowedOrigin = ACCEPTED_REFERRERS.includes(origin) ? origin : '';

        let responseContent;
        let contentType = 'application/javascript';
        if (new URL(request.url).pathname === '/cookie-setter.html') {
            contentType = 'text/html';
            responseContent = `
      <!DOCTYPE html>
      <html>
      <head><title>Cookie Setter</title></head>
      <body>
        <script>
          function serialize(options) {
            return Object.entries(options).map(([key, value]) => \`\${key}=\${value}\`).join('; ');
          }

          window.addEventListener('message', (event) => {
            
            if (event.origin === '${allowedOrigin}') {
                console.log({eventData: event.data});
              const cookieOptions = { path: '/', domain: '.${currentDomain}', secure: true, SameSite: 'None' };
              let accessTokenCookie = \`access_token=\${event.data.accessToken}; \${serialize(cookieOptions)}\`;
              document.cookie = accessTokenCookie;

              let refreshTokenCookie = \`refresh_token=\${event.data.refreshToken}; \${serialize(cookieOptions)}\`;
              document.cookie = refreshTokenCookie;
            }
          });
        </script>
      </body>
      </html>`;

        } else {
            responseContent = `

const cookieDomain = '${currentDomain}';
const ttl = 120;
let accessToken = '${accessToken}';
let refreshToken = '${refreshToken}';

let lastAccessTokenRefreshTime = 0;

function createCookieSetterIframe() {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = 'https://${currentDomain}/cookie-setter.html';
    iframe.id = 'cookieSetterIframe';
    iframe.height=100;
    iframe.width=800;
    document.body.appendChild(iframe);
}
createCookieSetterIframe();

function sendMessageToIframe(message) {
    const iframe = document.getElementById('cookieSetterIframe');
    if (iframe) {

        iframe.contentWindow.postMessage(message, '*');
    }
}

function setTokens(tokens) { 
    accessToken = tokens.accessToken;
    refreshToken = tokens.refreshToken;
    
    sendMessageToIframe({accessToken, refreshToken});
}

function serialize(options) {
    return Object.entries(options).map(([key, value]) => \`\${key}=\${value}\`).join('; ');
}


// Function to refresh access token
async function refreshAccessToken() {

    try {
        const response = await fetch('${NEYRA_API_ENDPOINT}/auth/refresh_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh_token: refreshToken}),
        });

        if (!response.ok) {
            throw new Error('Failed to refresh token');
        }

        const data = await response.json();

        // Update cookies 
        console.log('Access Token refreshed:', data.data.access_token);
        console.log('Refresh Token refreshed:', data.data.refresh_token);

        lastAccessTokenRefreshTime = Math.floor(Date.now() / 1000);
        const tokens = { accessToken: data.data.access_token, refreshToken: data.data.refresh_token };
        
        setTokens(tokens);

        return tokens;
    } catch (error) {
        console.error('Error refreshing token:', error);
        if (error instanceof Response && error.status === 401) {
            const currentLocation = encodeURIComponent(window.location.href);
            window.location.href = 'https://${currentDomain}/connect#backTo='+ encodeURIComponent(window.location.href);
        }
        return null;
    }
}

// Function to refresh access token if needed
async function getTokens() {
    const currentTime = Math.floor(Date.now() / 1000);
    if (refreshToken) {
        if (currentTime >= lastAccessTokenRefreshTime + ttl - 2) {
            return await refreshAccessToken(refreshToken);
        }
    }

    return { accessToken, refreshToken };
}
`;
        }


        return new Response(responseContent, {
            headers: {
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': allowedOrigin,
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        });
    },
};
