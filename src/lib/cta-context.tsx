import { createContext, useContext } from "react";

const defaultCTA = () => {
  document.getElementById("registration-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
};

const CTAContext = createContext<() => void>(defaultCTA);

export const CTAProvider = CTAContext.Provider;
export const useCTA = () => useContext(CTAContext);