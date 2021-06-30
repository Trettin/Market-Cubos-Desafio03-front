import { useEffect } from "react";
import useContextStates from "../../hooks/useContextStates";
import MenuLayout from "../../components/MenuLayout";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import useStyles from "./style";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Backdrop from "../../components/Backdrop";
import Alert from "@material-ui/lab/Alert";
import PasswordField from "../../components/Password";

export default function EditProfile() {
  const {
    loading,
    setLoading,
    error,
    setError,
    token,
    user,
    isEmpty,
    setUser,
  } = useContextStates();
  const classes = useStyles();
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  function handleCancelButton() {
    history.push("/perfil");
  }

  async function handleEditProfile(data) {
    setError("");
    setLoading(true);

    try {
      const updatedData = Object.fromEntries(
        Object.entries(data).filter(([, value]) => value)
      );

      if (isEmpty(updatedData)) {
        setLoading(false);
        return setError("Preencha pelo menos um campo antes de salvar.");
      }

      if (updatedData.password && !updatedData.passwordConfirm) {
        setLoading(false);
        return setError("Por favor confirme a sua senha");
      }
      if (updatedData.password !== updatedData.passwordConfirm) {
        setLoading(false);
        return setError("As senhas digitadas não conferem.");
      }

      const response = await fetch(`https://market-cubos.herokuapp.com/profile/edit`, {
        method: "PUT",
        body: JSON.stringify(updatedData),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = await response.json();
      setLoading(false);

      if (responseData.error) {
        return setError(responseData.error);
      }
      setUser(updatedData);
      history.push("/perfil");
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError("");
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  return (
    <MenuLayout storeName={user.store_name} index={3}>
      <Backdrop loading={loading} />
      <div style={{ display: "grid" }}>
        <h1 className={classes.title}>{user.store_name}</h1>
        <h2 className={classes.subtitle}>Editar Perfil</h2>
        <form
          onSubmit={handleSubmit(handleEditProfile)}
          className={classes.form}
        >
          <div className={classes.inputDiv}>
            <TextField
              id="name"
              className={classes.inputs}
              label="Seu nome"
              {...register("name")}
            />
            <TextField
              id="storeName"
              className={classes.inputs}
              label="Nome da loja"
              {...register("store_name")}
            />
            <TextField
              id="email"
              className={classes.inputs}
              label="E-mail"
              {...register("email")}
            />
            <PasswordField {...register("password")} label="Senha" />
            <PasswordField
              {...register("passwordConfirm")}
              label="Confirme sua senha"
            />
          </div>

          <Divider className={classes.divider} />
          {error && (
            <Alert className={classes.error} severity="error">
              {error}
            </Alert>
          )}

          <div className={classes.flexDiv}>
            <Button
              style={{
                color: "#007DFF",
                fontWeight: "bold",
                justifySelf: "start",
                textDecoration: "underline",
              }}
              color="primary"
              onClick={handleCancelButton}
            >
              CANCELAR
            </Button>
            <Button
              style={{
                backgroundColor: "#007DFF",
                fontWeight: "bold",
                justifySelf: "start",
              }}
              variant="contained"
              color="primary"
              type="submit"
            >
              EDITAR PERFIL
            </Button>
          </div>
        </form>
      </div>
    </MenuLayout>
  );
}
