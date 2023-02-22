import { ADD_TAG, DELETE_TAG, SET_TAG, SET_TAGS, CLEAR_TAGS } from '../../reduxActions';

export interface TagType {
  id: number;
  value: string;
}

const defaultState: TagType[] = [];

export const tagsReducer = (
  state = defaultState,
  action: { type: string; payload: [TagType, string, TagType[]] }
): TagType[] => {
  switch (action.type) {
    case SET_TAGS:
      state = action.payload[2];
      return state;
    case CLEAR_TAGS:
      state = [];
      return state;
    case SET_TAG:
      return state.map((el: TagType) => {
        if (el.id === action.payload[0].id) {
          el.value = action.payload[1];
        }

        return el;
      });
    case ADD_TAG:
      return [...state, action.payload[0]];
    case DELETE_TAG:
      return state.filter((el: TagType) => {
        return el.id !== action.payload[0].id;
      });
    default:
      return state;
  }
};

export const setTag = (
  payload: [TagType, string, TagType[]]
): { type: string; payload: [TagType, string, TagType[]] } => ({
  type: SET_TAG,
  payload,
});

export const addTag = (
  payload: [TagType, string, TagType[]]
): { type: string; payload: [TagType, string, TagType[]] } => ({
  type: ADD_TAG,
  payload,
});

export const deleteTag = (
  payload: [TagType, string, TagType[]]
): { type: string; payload: [TagType, string, TagType[]] } => ({
  type: DELETE_TAG,
  payload,
});

export const setTags = (
  payload: [TagType, string, TagType[]]
): { type: string; payload: [TagType, string, TagType[]] } => ({
  type: SET_TAGS,
  payload,
});

export const clearTags = (): { type: string } => ({
  type: CLEAR_TAGS,
});
