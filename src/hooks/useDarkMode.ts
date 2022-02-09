// See: https://usehooks-ts.com/react-hook/use-local-storage
import { useState } from "react";
import useLocalStorage from "./useLocalStorage";
// See: https://usehooks-ts.com/react-hook/use-media-query
import useMediaQuery from "./useMediaQuery";
// See: https://usehooks-ts.com/react-hook/use-update-effect
import useUpdateEffect from "./useUpdateEffect";

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

interface UseDarkModeOutput {
  isDarkMode: boolean;
  toggle: () => void;
  enable: () => void;
  disable: () => void;
}

function useDarkMode(defaultValue?: boolean): UseDarkModeOutput {
  const [isDarkMode, setDarkMode] = useState(false);

  return {
    isDarkMode,
    toggle: () => setDarkMode((prev) => !prev),
    enable: () => setDarkMode(true),
    disable: () => setDarkMode(false),
  };
}

export default useDarkMode;
