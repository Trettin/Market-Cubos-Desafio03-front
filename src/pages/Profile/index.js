import useContextStates from "../../hooks/useContextStates";
import MenuLayout from "../../components/MenuLayout";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import useStyles from "./style";
import { useHistory } from "react-router-dom";

export default function Profile() {
  const { user } = useContextStates();
  const classes = useStyles();
  const history = useHistory();

  return (
    <MenuLayout storeName={user.store_name} index={3}>
      <div style={{ display: "grid" }}>
        <h1 className={classes.title}>{user.store_name}</h1>
        <h2 className={classes.subtitle}>Perfil</h2>
        <div className={classes.inputDiv}>
          <TextField
            id="name"
            className={classes.inputs}
            label="Seu nome"
            value={user.name}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            id="storeName"
            className={classes.inputs}
            label="Nome da loja"
            value={user.store_name}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            id="email"
            className={classes.inputs}
            label="E-mail"
            value={user.email}
            InputLabelProps={{ shrink: true }}
          />
        </div>

        <Divider className={classes.divider} />
        <Button
          style={{
            backgroundColor: "#007DFF",
            fontWeight: "bold",
            justifySelf: "start",
          }}
          variant="contained"
          color="primary"
          onClick={() => history.push("/perfil/editar")}
        >
          EDITAR PERFIL
        </Button>
      </div>
    </MenuLayout>
  );
}
