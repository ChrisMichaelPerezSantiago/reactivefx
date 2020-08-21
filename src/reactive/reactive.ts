import { watchers, isPlainObject } from '../utils/index';

const dependencies = new Set<symbol>();


export const reactive = <T extends object>(t: T): T => {
  if(
    !isPlainObject(t) || 
    !Object.isExtensible(t)
  ){
    return t as any;
  }
  

  const keyToSymbolMap = new Map<keyof T, symbol>();
  const getSymbolForKey = (key: keyof T): symbol => {
    const symbol = keyToSymbolMap.get(key) || Symbol();
    if (!keyToSymbolMap.has(key)) {
      keyToSymbolMap.set(key, symbol);
    }
    return symbol;
  }

  return new Proxy(t, {
    set(target, key: keyof T, value) {
      target[key] = value;

      watchers
        .filter(({ dependencies }) => dependencies.has(getSymbolForKey(key)))
        .forEach(({ callback }) => callback())

      return true;
    },

    get(target, key: keyof T) {
      dependencies.add(getSymbolForKey(key));
      return target[key];
    },
  });
}