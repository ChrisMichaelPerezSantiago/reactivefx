import { IRef } from "../interfaces/IRef";
import { ref } from "./ref";
import { watch } from "./watch";

export const computed = <T>(fn: () => T): IRef<T> => {
  const r = ref<T>(undefined as any);

  watch(() => {
    r.value = fn();
  });

  return r;
}