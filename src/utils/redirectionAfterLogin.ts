export const redirectionAfterLogin = (isNewUser: boolean) => {
  const redirectPath = isNewUser ? '/welcome' : '/chat';
  const redirectHref = `${window.location.origin}${redirectPath}`;
  const previousSpace = document.referrer.includes('space');

  isNewUser && window.localStorage.setItem('connectNewUser', 'true');

  if (previousSpace && isNewUser) {
    window.localStorage.setItem('referrer', document.referrer);
  }
  window.location.href = isNewUser ? redirectHref : previousSpace ? document.referrer : redirectHref;
};
