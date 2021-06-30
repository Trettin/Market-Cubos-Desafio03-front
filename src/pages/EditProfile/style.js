import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  form: {
    width: "24.5rem",
  },
  title: {
    marginBottom: "1rem",
    fontSize: "2.5rem",
  },
  subtitle: {
    marginBottom: "3rem",
    fontSize: "1.75rem",
  },
  inputDiv: {
    display: "flex",
    flexDirection: "column",
    gap: "3rem",
  },
  inputs: {
    width: "24.5rem",
  },
  divider: {
    margin: "4rem 0 1rem",
  },
  flexDiv: {
    display: "flex",
    gap: "2rem",
  },
  error: {
    margin: "1rem 0",
  },
}));
