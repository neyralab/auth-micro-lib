export const redirectionAfterLogin = (isNewUser: boolean) => {
  const redirectPath = isNewUser ? '/registration' : '/chat';
  window.location.href = `${window.location.origin}${redirectPath}`;
};
