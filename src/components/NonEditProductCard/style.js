import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  root: {
    width: "14.5rem",
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
  },
  media: {
    height: "15rem",
    backgroundSize: "cover",
  },
  trashButton: {
    position: "absolute",
    top: "1rem",
    left: "1rem",
    height: "3rem",
    width: "3rem",
    borderRadius: "50px ",
    backgroundColor: "#FF505F",
    zIndex: 1,
    display: "grid",
    placeContent: "center",
    "&:hover": {
      cursor: "pointer",
    },
  },
  trashIcon: {
    height: "1.5rem",
    width: "1.5rem",
  },
});
