"use client";
import React, { createContext, ReactNode } from "react";
import { RootStore } from "./RootStore";

const rootStoreInstance = new RootStore();
(window as any).rootStore = rootStoreInstance;
export const StoreContext = createContext<RootStore>(new RootStore());

export const StoreWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <StoreContext.Provider value={rootStoreInstance}>{children}</StoreContext.Provider>
  );
};
