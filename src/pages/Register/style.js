import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  root: {
    minWidth: 275,
    boxShadow:
      "0px 8px 9px -5px rgba(0, 0, 0, 0.2), 0px 15px 22px 2px rgba(0, 0, 0, 0.14), 0px 6px 28px 5px rgba(0, 0, 0, 0.12)",
    borderRadius: "16px",
    padding: "4rem 5.375rem 4.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "1rem 0",
    justifySelf: "center",

    "& h2": {
      fontSize: "2.125rem",
      marginBottom: "4.5rem",
      color: "rgba(0, 0, 0, 0.87)",
    },
    "& p": {
      fontSize: "0.75rem",
      letterSpacing: "0.4px",
      color: "rgba(0, 0, 0, 0.87)",
    },
  },
  gapDiv: {
    display: "flex",
    flexDirection: "column",
    gap: "3rem",
    width: "13.75rem",
  },
  registerFields: {
    width: "100%",
  },
  error: {
    width: "100%",
  },
  link: {
    textDecoration: "underline",
    color: "#007DFF",
  },
});
