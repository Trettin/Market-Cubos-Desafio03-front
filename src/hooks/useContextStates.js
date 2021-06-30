import { useContext } from "react";

import ContextStates from "../context";

export default function useContextStates() {
  return useContext(ContextStates);
}
