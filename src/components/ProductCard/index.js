import React from "react";
import useStyles from "./style";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import { CardActionArea } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import useContextStates from "../../hooks/useContextStates";
import AlertDialog from "../AlertDialog";
import Backdrop from "../Backdrop";
import Chip from "@material-ui/core/Chip";

export default function ProductCard({
  name,
  stock,
  price,
  description,
  image,
  productId,
  category,
}) {
  const classes = useStyles();
  const history = useHistory();
  const { loading, setProductIdEdit, setOpen } = useContextStates();

  function handlePushEditProductId(id) {
    setProductIdEdit(id);
    history.push(`/produtos/${id}/editar`);
  }

  return (
    <Card className={classes.root}>
      <Backdrop loading={loading} />
      <AlertDialog productId={productId} />
      <div className={classes.trashButton} onClick={() => setOpen(true)}>
        <DeleteSweepIcon className={classes.trashIcon} />
      </div>
      <CardActionArea onClick={() => handlePushEditProductId(productId)}>
        <CardMedia className={classes.media} image={image} title={name} />

        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            height: "197px",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Typography gutterBottom variant="h6" component="h6">
              {name}
            </Typography>
            <Chip
              label={category}
              variant="outlined"
              size="small"
              style={{ marginBottom: "3px" }}
            />
            <Typography
              variant="body2"
              style={{ color: "rgba(34, 34, 34, 0,87)", fontSize: ".75rem" }}
              component="p"
            >
              {description}
            </Typography>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="body1"
              color="textSecondary"
              style={{ letterSpacing: 1 }}
              component="p"
            >
              {stock} UNIDADES
            </Typography>
            <Typography variant="body1" color="textPrimary" component="p">
              R$ {(price / 100).toFixed(2)}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
