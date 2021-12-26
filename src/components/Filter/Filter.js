import React from 'react';
import { TextField } from '@material-ui/core';
import * as  contactsActions from '../../redux/contacts/contacts-actions';
import { useDispatch } from 'react-redux';

export default function Filter() {
  const dispatch = useDispatch();
  return (
    <div>
      <TextField
        type="text"
        name="filter"
        label="Find contacts by name:"
        onChange={e => {
          dispatch(contactsActions.changeFilter(e.target.value));
        }}
      />
    </div>
  );
}