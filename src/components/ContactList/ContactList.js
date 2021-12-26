import * as contactsOperations from '../../redux/contacts/contacts-operations';
import * as contactsSelectors  from '../../redux/contacts/contacts-selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import ContactItem from '../ContactItem/ContactItem';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    listStyle: 'none',
  },
}));

export default function ContactList({ onEdit }) {
  const contacts = useSelector(contactsSelectors.getFilteredContacts);

  const dispatch = useDispatch();
  const c = useStyles();

  useEffect(() => dispatch(contactsOperations.fetchContacts()), [dispatch]);

  return (
    <>
      <Grid container component="ul" spacing={3} className={c.root}>
        {contacts.length > 0 &&
          contacts.map(contact => (
            <ContactItem key={contact.id} contact={contact} onEdit={onEdit} />
          ))}
      </Grid>
    </>
  );
}