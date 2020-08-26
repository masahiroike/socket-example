import { reducers } from "../stores";
import { Reducer } from "@reduxjs/toolkit";

type StoreState = {
  [key in keyof typeof reducers]: typeof reducers[key] extends Reducer<
    infer T,
    AnyAction
  >
    ? T
    : never;
};

declare module "react-redux" {
  interface DefaultRootState extends StoreState {}
}

export type JsonParse<T> = T extends { [key: string]: any }
  ? {
      [key in keyof T]: T[key] extends Date
        ? ReturnType<Date["toString"]>
        : T[key] extends Date | undefined
        ? ReturnType<Date["toString"]> | undefined
        : T[key];
    }
  : never;
