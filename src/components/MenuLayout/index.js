import "./style1.css";
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";
import useContextValues from "../../hooks/useContextValues";
import {
  Storefront,
  Store,
  Home,
  AccountCircle,
  Cancel,
} from "@material-ui/icons";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "100vh",
    "& .MuiTab-wrapper": {
      flexDirection: "unset",
      gap: "0.5rem",
      justifyContent: "left",
    },
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs({ children, index }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(index);
  const history = useHistory();
  const { setError, token, logout } = useContextValues();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePushHistory = (url) => {
    setError("");
    history.push(url);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
      >
        <Tab
          label="Home"
          {...a11yProps(0)}
          onClick={() => handlePushHistory("/")}
          icon={<Home style={{ color: "#f50057" }} />}
        />
        <Tab
          label="Pesquisar loja"
          {...a11yProps(1)}
          onClick={() => handlePushHistory("/lojas")}
          icon={<Store style={{ color: "#f50057" }} />}
        />
        {!token && (
          <Tab
            label="Login/Cadastro"
            {...a11yProps(2)}
            onClick={() => handlePushHistory("/login")}
            icon={<AccountCircle style={{ color: "#f50057" }} />}
          />
        )}

        {token && (
          <Tab
            label="Produtos"
            {...a11yProps(2)}
            onClick={() => handlePushHistory("/produtos")}
            icon={<Storefront style={{ color: "#f50057" }} />}
          />
        )}
        {token && (
          <Tab
            label="Perfil"
            {...a11yProps(3)}
            onClick={() => handlePushHistory("/perfil")}
            icon={<AccountCircle style={{ color: "#f50057" }} />}
          />
        )}
        {token && (
          <Tab
            label="Deslogar"
            {...a11yProps(4)}
            onClick={() => {
              logout();
              handlePushHistory("/login");
            }}
            icon={
              <div
                style={{ display: "grid", placeContent: "center", width: 24 }}
              >
                <Cancel style={{ color: "#f50057" }} fontSize="small" />
              </div>
            }
          />
        )}
      </Tabs>
      <TabPanel value={value} index={index}>
        {children}
      </TabPanel>
    </div>
  );
}
