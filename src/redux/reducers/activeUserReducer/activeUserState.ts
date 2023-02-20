import { type ActiveUserType } from './activeUserTypes';

export const defaultState: ActiveUserType = {
  user: {
    email: '',
    token: '',
    username: '',
    bio: '',
    image: '',
  },
};
