import { useEffect } from "react";
import useContextStates from "../../hooks/useContextStates";
import MenuLayout from "../../components/MenuLayout";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import useStyles from "./style";
import { useForm } from "react-hook-form";
import Backdrop from "../../components/Backdrop";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";

export default function EditProduct(props) {
  const classes = useStyles();
  const {
    loading,
    setLoading,
    error,
    setError,
    token,
    user,
    productIdEdit,
    isEmpty,
  } = useContextStates();
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  async function handleEditProduct(data) {
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
      if (updatedData.price) {
        updatedData.price = updatedData.price * 100;
      }

      const response = await fetch(
        `https://market-cubos.herokuapp.com/${productIdEdit}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedData),
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = await response.json();
      setLoading(false);

      if (responseData.error) {
        return setError(responseData.error);
      }
      history.push("/produtos");
    } catch (error) {
      setLoading(false);
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
    <MenuLayout storeName={user.store_name} index={2}>
      <Backdrop loading={loading} />
      <div style={{ display: "grid" }}>
        <h1 className={classes.title}>{user.store_name}</h1>
        <h2 className={classes.subtitle}>Editar Produto</h2>
        <form onSubmit={handleSubmit(handleEditProduct)}>
          <div className={classes.flexDiv}>
            <div className={classes.form}>
              <TextField
                id="name"
                className={classes.inputs}
                label="Nome do produto"
                {...register("name")}
              />
              <div className={classes.priceAndStock}>
                <TextField
                  id="price"
                  className={classes.inputs}
                  label="Preço"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                    inputProps: { min: 0 },
                  }}
                  {...register("price")}
                />
                <TextField
                  id="stock"
                  className={classes.inputs}
                  label="Estoque"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Un</InputAdornment>
                    ),
                    inputProps: { min: 0 },
                  }}
                  {...register("stock")}
                />
              </div>
              <TextField
                id="description"
                className={classes.inputs}
                label="Descrição"
                {...register("description")}
              />
              <TextField
                id="image"
                className={classes.inputs}
                label="Imagem"
                {...register("image")}
              />
            </div>
          </div>
          {error && (
            <Alert className={classes.error} severity="error">
              {error}
            </Alert>
          )}
          <Divider className={classes.divider} />
          <div className={classes.flexDiv}>
            <Button
              style={{
                color: "#007DFF",
                fontWeight: "bold",
                justifySelf: "start",
                textDecoration: "underline",
              }}
              color="primary"
              onClick={() => history.push("/produtos")}
            >
              CANCELAR
            </Button>
            <Button
              type="submit"
              style={{
                backgroundColor: "#007DFF",
                fontWeight: "bold",
                justifySelf: "start",
              }}
              variant="contained"
              color="primary"
            >
              SALVAR ALTERÇÕES
            </Button>
          </div>
        </form>
      </div>
    </MenuLayout>
  );
}
