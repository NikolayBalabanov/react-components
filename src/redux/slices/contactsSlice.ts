import { createSlice } from '@reduxjs/toolkit';
import { IContact } from '../../types/contacts';

interface IcontsctsState {
  contacts: IContact[];
}

const initialState: IcontsctsState = {
  contacts: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
  },
});

export default contactsSlice.reducer;
export const { addContact } = contactsSlice.actions;
