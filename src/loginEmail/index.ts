import axios from 'axios';

export const connectUserv8Email = async ({ NEIRA_AI_API, name, password, email }) => {
  const response = await axios.put(
    `${NEIRA_AI_API}/auth/identity/connect_userv8`,
    {
      provider: 'email',
      first_name: name,
      password,
      email,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response;
};

