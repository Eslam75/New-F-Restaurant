import { createContext, useState } from "react";

export const QucikViewee=createContext()

export const MyProvider = ({ children }) => {
    const [openQuickView, setopenQuickView] = useState(false);
    const [openQuickproduct, setopenQuickproduct] = useState({});

    return (
      <QucikViewee.Provider value={{ setopenQuickproduct,openQuickproduct,openQuickView, setopenQuickView }}>
        {children}
      </QucikViewee.Provider>
    );
  };
  