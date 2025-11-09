"use client";

import { store } from "@/src/app/store";
import { Provider } from "react-redux";

export const ProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <Provider store={store}>{children}</Provider>;
};
