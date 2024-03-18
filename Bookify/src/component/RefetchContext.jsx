import React, { createContext, useState } from "react";

const RefetchContext = createContext();

export const RefetchProvider = ({ children }) => {
  const [refetchTrigger, setRefetchTrigger] = useState(false);

  const toggleRefetch = () => {
    console.log("toggle refetch has ran");
    setRefetchTrigger((prevRefetchTrigger) => !prevRefetchTrigger);
  };

  return (
    <RefetchContext.Provider
      value={{ refetchTrigger, setRefetchTrigger, toggleRefetch }}
    >
      {children}
    </RefetchContext.Provider>
  );
};

export default RefetchContext;
