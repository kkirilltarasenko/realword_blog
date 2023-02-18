import { SET_SLUG } from '../../reduxActions';

const defaultState: { slug: string } = {
  slug: '',
};

export const slugReducer = (
  state = defaultState,
  action: { type: string; payload: string }
): { slug: string } => {
  switch (action.type) {
    case SET_SLUG:
      return { ...state, slug: action.payload };
    default:
      return state;
  }
};

export const setSlug = (payload: string): { type: string; payload: string } => ({
  type: SET_SLUG,
  payload,
});
