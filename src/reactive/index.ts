import debounce from 'lodash.debounce';

import { watchers, isPlainObject } from '../utils/index';
import { IRef } from '../interfaces/IRef'


const dependencies = new Set<symbol>();


export const watch = (callback: () => any) => {
  const watcher = {
    callback: debounce(() => {
      dependencies.clear();
      callback();
      watcher.dependencies = new Set(dependencies)
    }, 0),
    dependencies: new Set<symbol>(),
  }

  watcher.callback();
  watchers.push(watcher);
}

export const reactive = <T extends object>(obj: T): T => {
  if (
    !isPlainObject(obj) ||
    !Object.isExtensible(obj)
  ) {
    return obj as any;
  }

  const keyToSymbolMap = new Map<keyof T, symbol>();
  const getSymbolForKey = (key: keyof T): symbol => {
    const symbol = keyToSymbolMap.get(key) || Symbol()
    if (!keyToSymbolMap.has(key)) {
      keyToSymbolMap.set(key, symbol);
    }
    return symbol;
  }

  return new Proxy(obj, {
    set(target, key: keyof T, value) {
      target[key] = value;

      watchers
        .filter(({ dependencies }) => dependencies.has(getSymbolForKey(key)))
        .forEach(({ callback }) => callback());

      return true;
    },

    get(target, key: keyof T) {
      dependencies.add(getSymbolForKey(key));
      return target[key];
    },
  });
}

export const ref = <T>(value: T): IRef<T> => {
  return reactive({ value });
}

export const computed = <T>(fn: () => T): IRef<T> => {
  const r = ref<T>(undefined as any);

  watch(() => {
    r.value = fn();
  });

  return r;
}
