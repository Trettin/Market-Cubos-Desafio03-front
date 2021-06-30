import React from "react";
import useStyles from "./style";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory, Link } from "react-router-dom";
import PasswordField from "../../components/Password";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import Alert from "@material-ui/lab/Alert";
import Backdrop from "../../components/Backdrop";
import MenuLayout from "../../components/MenuLayout/index";
import useContextValues from "../../hooks/useContextValues";

export default function Login() {
  const { loading, setLoading, error, setError, login } = useContextValues();
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();

  async function onSubmitLogin(data) {
    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://market-cubos.herokuapp.com/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });
      const responseData = await response.json();
      setLoading(false);

      if (responseData.error) {
        return setError(responseData.error);
      }
      login(responseData);
      history.push("/produtos");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <MenuLayout index={2}>
      <form className={classes.root} onSubmit={handleSubmit(onSubmitLogin)}>
        <Backdrop loading={loading} />
        <Typography className={classes.loginTitle} variant="h5" component="h2">
          Login
        </Typography>

        <TextField
          className={classes.loginEmailInput}
          id="standard-basic"
          label="E-mail"
          style={{ marginBottom: "3rem", width: "100%" }}
          {...register("email", {
            required: "O campo 'E-mail' é obrigatório.",
          })}
        />

        <PasswordField
          label="Senha"
          {...register("password", {
            required: "O campo 'Senha' é obrigatório.",
          })}
        />
        {error && (
          <Alert className={classes.error} severity="error">
            {error}
          </Alert>
        )}
        {(errors.email || errors.password) && (
          <Alert className={classes.error} severity="error">
            {errors.email?.message || errors.password?.message}
          </Alert>
        )}

        <CardActions>
          <Button
            type="submit"
            className={classes.loginButton}
            size="medium"
            variant="contained"
            style={{
              margin: "2.5rem 0 1.5rem",
              backgroundColor: "#007DFF",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Entrar
          </Button>
        </CardActions>
        <Typography variant="body2" component="p">
          Primeira vez aqui?{" "}
          <Link className={classes.register} to="/cadastro">
            CRIE UMA CONTA{" "}
          </Link>
        </Typography>
      </form>
    </MenuLayout>
  );
}
