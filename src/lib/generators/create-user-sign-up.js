import { randEmail, randUserName, randPassword } from '@ngneat/falso';

const createUserSignUp = () => {
  return {
    email: randEmail(),
    name: randUserName().slice(0, 16),
    password: randPassword(),
  };
};

export default createUserSignUp;
