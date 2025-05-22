
import { createContext } from "react";

const LangContext = createContext({
  lang: 'es',
  setLang: () => {}
});

export default LangContext;
