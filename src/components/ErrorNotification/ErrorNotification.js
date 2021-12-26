import { IconButton, Snackbar } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import { useDispatch } from 'react-redux';

export default function ErrorNotification({ action, message }) {
  const dispatch = useDispatch();

  const handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(action());
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open
        autoHideDuration={6000}
        message={message}
        onClose={handleErrorClose}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleErrorClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
}