import "./style.css";
import { forwardRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import useContextStates from "../../hooks/useContextStates";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog({ productId }) {
  const { open, setOpen, handleDelete, products, setProducts } =
    useContextStates();

  const handleClose = () => {
    setOpen(false);
  };

  function handleNewProducts() {
    handleDelete(productId);
    const newProducts = products.filter((product) => product.id !== productId);

    setProducts(newProducts);
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        style={{ borderRadius: "24px", overflow: "" }}
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Remover produto do catálogo?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Esta ação não poderá ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            variant="contained"
            style={{ backgroundColor: "#007DFF", fontWeight: "bold" }}
          >
            MANTER PRODUTO
          </Button>
          <Button
            onClick={handleNewProducts}
            color="secondary"
            variant="contained"
            style={{ backgroundColor: "#FF505F", fontWeight: "bold" }}
          >
            REMOVER
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
