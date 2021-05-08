import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog({ title, text, open, toggle }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={toggle}
        aria-labelledby={title}
        aria-describedby={text}
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggle} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
