import React, {createContext, useContext, useState} from 'react';

const LoadingContext = createContext();

const AppProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{isLoading, setIsLoading}}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);

export default AppProvider;
