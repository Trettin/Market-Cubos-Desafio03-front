import MenuLayout from "../../components/MenuLayout";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import useContextValues from "../../hooks/useContextValues";
import { useState, useEffect } from "react";
import useStyles from "./style";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Backdrop from "../../components/Backdrop";
import NonEditProductCard from "../../components/NonEditProductCard";

export default function Stores() {
  const { error, setError, loading, setLoading } = useContextValues();
  const [foundProducts, setFoundProducts] = useState([]);
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function handleFindProducts(data) {
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `https://market-cubos.herokuapp.com/stores/${data.storeName}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const responseData = await response.json();
      setLoading(false);

      if (responseData.error) {
        return setError(responseData.error);
      }
      setFoundProducts(responseData);
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      reset();
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [errors]);

  return (
    <MenuLayout index={1}>
      <Backdrop loading={loading} />

      <h1 className={classes.title}>Qual loja deseja visitar?</h1>

      <form
        onSubmit={handleSubmit(handleFindProducts)}
        className={classes.formVisit}
      >
        <TextField
          className={classes.loginEmailInput}
          id="standard-basic"
          label="Nome da loja"
          style={{ marginBottom: "1rem", width: "100%" }}
          {...register("storeName", {
            required: "Antes de enviar escreva o nome de uma loja.",
          })}
        />

        <Button
          style={{ backgroundColor: "#007DFF", fontWeight: "bold" }}
          variant="contained"
          color="primary"
          type="submit"
        >
          ENVIAR
        </Button>

        {error && (
          <Alert className={classes.error} severity="error">
            {error}
          </Alert>
        )}
        {errors.storeName && (
          <Alert className={classes.error} severity="error">
            {errors.storeName?.message}
          </Alert>
        )}
        <Divider style={{ margin: "1rem 0" }} />
      </form>

      <div
        style={{
          marginTop: "1rem",
          marginBottom: "3rem",
          display: "grid",
          gridAutoFlow: "column",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fill, 14.5rem)",
        }}
      >
        {foundProducts.length > 0 &&
          foundProducts.map((product) => {
            return (
              <NonEditProductCard
                name={product.name}
                stock={product.stock}
                price={product.price}
                description={product.description}
                image={product.image}
                key={product.id}
                productId={product.id}
                category={product.category}
                storeName={product.store_name}
              />
            );
          })}
      </div>
    </MenuLayout>
  );
}
