import { Typography } from "@material-ui/core";
import MenuLayout from "../../components/MenuLayout";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <MenuLayout index={0}>
      <h1 style={{ marginBottom: "4rem", fontSize: "2.5rem" }}>Bem-vindes!</h1>

      <Typography variant="body1" style={{ width: "24rem" }} align="justify">
        Olá, esse é o Market Cubos onde você pode{" "}
        <Link
          style={{ textDecoration: "underline", color: "rgb(0, 125, 255)" }}
          to="/lojas"
        >
          pesquisar
        </Link>{" "}
        por uma de nossas lojas cadastradas e além disso você também pode{" "}
        <Link
          style={{ textDecoration: "underline", color: "rgb(0, 125, 255)" }}
          to="/cadastro"
        >
          cadastrar
        </Link>{" "}
        sua própria loja e seus produtos. Para isso basta se{" "}
        <Link
          style={{ textDecoration: "underline", color: "rgb(0, 125, 255)" }}
          to="/cadastro"
        >
          cadastrar
        </Link>{" "}
        para usufruir de nossos serviços.
      </Typography>
    </MenuLayout>
  );
}
