import useContextStates from "../../hooks/useContextStates";
import MenuLayout from "../../components/MenuLayout";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import useStyles from "./style";
import { useForm } from "react-hook-form";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import Backdrop from "../../components/Backdrop";

export default function NewProduct(props) {
  const { loading, setLoading, error, setError, token, user } =
    useContextStates();
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();

  async function handleNewProduct(data) {
    setError("");
    setLoading(true);
    try {
      const updatedData = Object.fromEntries(
        Object.entries(data).filter(([, value]) => value)
      );

      if (updatedData.price) {
        updatedData.price = updatedData.price * 100;
      }

      const response = await fetch(
        `https://market-cubos.herokuapp.com/products`,
        {
          method: "POST",
          body: JSON.stringify(updatedData),
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token ?? localStorage.getItem("TOKEN")}`,
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
      setError(error.message);
    }
  }

  return (
    <MenuLayout storeName={user.store_name} index={2}>
      <Backdrop loading={loading} />

      <div style={{ display: "grid" }}>
        <h1 className={classes.title}>{user.store_name}</h1>
        <h2 className={classes.subtitle}>Adicionar produto</h2>
        <form onSubmit={handleSubmit(handleNewProduct)}>
          <div className={classes.formWrapper}>
            <div className={classes.form}>
              <TextField
                id="name"
                className={classes.inputs}
                label="Nome do produto"
                {...register("name", {
                  required: "O campo 'Nome do produto' é obrigatório.",
                  maxLength: 40,
                })}
              />
              <TextField
                id="category"
                className={classes.inputs}
                label="Categoria"
                {...register("category", { maxLength: 40 })}
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
                  {...register("price", {
                    required: "O campo 'Preço' é obrigatório.",
                  })}
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
                  {...register("stock", {
                    required: "O campo 'Estoque' é obrigatório.",
                  })}
                />
              </div>
              <TextField
                id="description"
                className={classes.inputs}
                label="Descrição"
                {...register("description", {
                  required: "O campo 'Descrição' é obrigatório.",
                })}
              />
              <TextField
                id="image"
                className={classes.inputs}
                label="Imagem"
                {...register("image", {
                  required: "O campo 'Imagem' é obrigatório.",
                })}
              />
            </div>
          </div>

          <Divider className={classes.divider} />
          {error && (
            <Alert className={classes.error} severity="error">
              {error}
            </Alert>
          )}
          {(errors.name ||
            errors.category ||
            errors.price ||
            errors.stock ||
            errors.description ||
            errors.image) && (
            <Alert className={classes.error} severity="error">
              {(errors.name?.type === "maxLength" &&
                "O 'Nome do produto' deve ter no máximo 40 caracteres.") ||
                errors.name?.message ||
                (errors.category?.type === "maxLength" &&
                  "O campo 'Categoria' deve ter no máximo 30 caracteres.") ||
                errors.category?.message ||
                errors.price?.message ||
                errors.stock?.message ||
                errors.description?.message ||
                errors.image?.message}
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
              ADICIONAR PRODUTO
            </Button>
          </div>
        </form>
      </div>
    </MenuLayout>
  );
}
