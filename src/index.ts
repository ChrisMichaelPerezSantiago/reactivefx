import {ref, reactive, UnwrapRef, Ref } from 'vue-demi';



export function fxReactive<T extends object>(obj: T): UnwrapRef<T> {
  return reactive(obj);
}

const fx = fxReactive({
  data: []
});


console.log(fx.data);
