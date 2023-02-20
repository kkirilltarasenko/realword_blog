import { type FormInputType } from './formInputTypes';

export const defaultState: FormInputType[] = [
  {
    id: 1,
    label: 'Username',
    placeholder: 'Username',
    value: '',
    type: 'text',
    error: '',
    errorCheck: false,
  },
  {
    id: 2,
    label: 'Email address',
    placeholder: 'Email address',
    value: '',
    type: 'text',
    error: '',
    errorCheck: false,
  },
  {
    id: 3,
    label: 'Password',
    placeholder: 'Password',
    value: '',
    type: 'password',
    error: 'Your password needs to be at least 6 characters.',
    errorCheck: false,
  },
  {
    id: 4,
    label: 'Repeat password',
    placeholder: 'Repeat password',
    value: '',
    type: 'password',
    error: 'Passwords must match',
    errorCheck: false,
  },
  {
    id: 5,
    label: 'New password',
    placeholder: 'New password',
    value: '',
    type: 'text',
    error: '',
    errorCheck: false,
  },
  {
    id: 6,
    label: 'Avatar image (url)',
    placeholder: 'Avatar image (url)',
    value: '',
    type: 'text',
    error: '',
    errorCheck: false,
  },
];
