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
import useContextStates from "../../hooks/useContextStates";
import MenuLayout from "../../components/MenuLayout";

export default function Register() {
  const { loading, setLoading, error, setError } = useContextStates();
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();

  async function onSubmit(data) {
    setError("");
    setLoading(true);

    try {
      if (data.password !== data.passwordConfirm) {
        setLoading(false);
        throw new Error("As senhas não conferem.");
      }
      const response = await fetch("https://market-cubos.herokuapp.com/register", {
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

      history.push("/login");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <MenuLayout index={2}>
      <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
        <Backdrop loading={loading} />
        <Typography className={classes.loginTitle} variant="h5" component="h2">
          Criar uma conta
        </Typography>
        <div className={classes.gapDiv}>
          <TextField
            className={classes.registerFields}
            label="Seu nome"
            {...register("name", { required: "O campo 'nome' é obrigatório." })}
          />
          <TextField
            className={classes.registerFields}
            label="Nome da loja"
            {...register("store_name", {
              required: "O campo 'nome da loja' é obrigatório.",
            })}
          />
          <TextField
            className={classes.registerFields}
            label="E-mail"
            {...register("email", {
              required: "O campo 'email' é obrigatório.",
            })}
          />

          <PasswordField
            {...register("password", {
              required: "O campo 'senha' é obrigatório.",
            })}
            label="Senha"
          />
          <PasswordField
            {...register("passwordConfirm", {
              required: "O campo 'confirmar senha' é obrigatório.",
            })}
            label="Confirme sua senha"
          />
          {error && (
            <Alert className={classes.error} severity="error">
              {error}
            </Alert>
          )}
          {(errors.name ||
            errors.store_name ||
            errors.email ||
            errors.password ||
            errors.passwordConfirm) && (
            <Alert className={classes.error} severity="error">
              {errors.name?.message ||
                errors.store_name?.message ||
                errors.email?.message ||
                errors.password?.message ||
                errors.passwordConfirm?.message}
            </Alert>
          )}
        </div>

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
            CRIAR CONTA
          </Button>
        </CardActions>

        <Typography variant="body2" component="p">
          Já possui uma conta?{" "}
          <Link className={classes.link} to="/login">
            ACESSE{" "}
          </Link>
        </Typography>
      </form>
    </MenuLayout>
  );
}
