import { IRef } from "../interfaces/IRef";
import { reactive } from "./reactive";

export function ref<T>(value: T): IRef<T> {
  return reactive({
    value
  });
}