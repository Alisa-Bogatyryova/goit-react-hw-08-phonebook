import * as actions from './contacts-actions';

import {
  addContact,
  deleteContact,
  fetchContacts,
  updateContact,
} from './contacts-operations';

import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

const items = createReducer([], {
  [fetchContacts.fulfilled]: (_, action) => action.payload,
  [addContact.fulfilled]: (state, { payload }) => [payload, ...state],
  [deleteContact.fulfilled]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),

  [updateContact.fulfilled]: (state, { payload }) => {
    return [...state].map(item => {
      if (item.id === payload.id) {
        return payload;
      }
      return item;
    });
  },
});

const filter = createReducer('', {
  [actions.changeFilter]: (state, { payload }) => payload,
});

const isLoading = createReducer(false, {
  [fetchContacts.pending]: () => true,
  [fetchContacts.fulfilled]: () => false,
  [fetchContacts.rejected]: () => false,

  [addContact.pending]: () => true,
  [addContact.fulfilled]: () => false,
  [addContact.rejected]: () => false,

  [deleteContact.pending]: () => true,
  [deleteContact.fulfilled]: () => false,
  [deleteContact.rejected]: () => false,

  [updateContact.pending]: () => true,
  [updateContact.fulfilled]: () => false,
  [updateContact.rejected]: () => false,
});

const error = createReducer(null, {
  [fetchContacts.pending]: () => null,
  [fetchContacts.rejected]: (_, action) => action.payload,

  [addContact.pending]: () => null,
  [addContact.rejected]: (_, action) => action.payload,

  [deleteContact.pending]: () => null,
  [deleteContact.rejected]: (_, action) => action.payload,

  [updateContact.pending]: () => null,
  [updateContact.rejected]: (_, action) => action.payload,

  [actions.resetError]: () => null,
});

export default combineReducers({ items, filter, isLoading, error });