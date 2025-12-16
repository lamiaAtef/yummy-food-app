import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [collapsed, setCollapsed] = useState(false);
    const sidebarWidth = collapsed ? 80 : 250; 
    console.log(sidebarWidth)

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed ,sidebarWidth}}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}
