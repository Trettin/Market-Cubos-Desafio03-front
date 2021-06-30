import ContextStates from "./index";
import useContextValues from "../hooks/useContextValues";

export default function ContextProvider(props) {
  const values = useContextValues();

  return (
    <ContextStates.Provider value={values}>
      {props.children}
    </ContextStates.Provider>
  );
}
