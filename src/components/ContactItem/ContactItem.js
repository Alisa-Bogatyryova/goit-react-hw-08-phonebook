import {
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import * as contactsOperations from '../../redux/contacts/contacts-operations';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  cardContent: {
    flexGrow: 1,
  },
  cardActions: {
    justifyContent: 'flex-end',
  },
}));

export default function ContactItem({ contact, onEdit }) {
  const dispatch = useDispatch();
  const c = useStyles();

  return (
    <>
      <Grid item component="li" xs={12} sm={6} md={4}>
        <Card className={c.card}>
          <CardContent className={c.cardContent}>
            <Typography variant="h6">{contact.name}</Typography>
            <Typography variant="body1">{contact.number}</Typography>
          </CardContent>

          <CardActions disableSpacing className={c.cardActions}>
            <IconButton onClick={() => onEdit(contact)}>
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() =>
                dispatch(contactsOperations.deleteContact(contact.id))
              }
              aria-label="Delete contact"
            >
              <DeleteForeverIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}