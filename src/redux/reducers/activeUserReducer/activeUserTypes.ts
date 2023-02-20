export interface ActiveUserType {
  user: {
    email: string;
    token: string;
    username: string;
    bio?: string;
    image?: string;
  };
}
