import { randEmail, randUserName, randPassword } from '@ngneat/falso';

const createUserSignUp = () => {
  return {
    email: randEmail(),
    name: randUserName(),
    password: randPassword(),
  };
};

export default createUserSignUp;
