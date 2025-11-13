"use client";
import { store } from "./store/store";
import { Provider } from "react-redux";

export const ProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <Provider store={store}>{children}</Provider>;
};
