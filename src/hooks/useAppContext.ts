import { useContext } from "react";
import { Context } from "../provider";

export const useAppContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useAppContext must be used within a Provider");
  }
  return context;
};
