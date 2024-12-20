import * as React from "react";

/**
 * Context used for patron and production status data.
 */
export const HeaderContext = React.createContext(null);

/**
 * Context Provider used only in the Header component.
 */
export const HeaderProvider = ({
  children,
  isProduction = true,
  patronName = "",
}) => {
  return (
    <HeaderContext.Provider value={{ isProduction, patronName }}>
      {children}
    </HeaderContext.Provider>
  );
};
