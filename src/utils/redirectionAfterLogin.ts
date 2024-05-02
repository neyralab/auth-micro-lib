export const redirectionAfterLogin = (isNewUser: boolean) => {
  const redirectPath = isNewUser ? '/welcome' : '/chat';
  window.location.href = `${window.location.origin}${redirectPath}`;
};
