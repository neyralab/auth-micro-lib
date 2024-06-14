import axios from 'axios';

declare global {
  interface Window {
    userIp?: string;
  }
}

export const getUserIp = async (): Promise<string> => {
  try {
    if (window.userIp) {
      return window.userIp;
    }
    const res = await axios.get<{ ip: string }>('https://api.ipify.org/?format=json');

    Object.defineProperty(window, 'userIp', {
      value: res.data.ip,
      writable: false,
      configurable: false,
    });

    return res.data.ip;
  } catch (error) {
    console.error(error);
    return '';
  }
};
