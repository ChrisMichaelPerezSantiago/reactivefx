const toString = (x: any) => Object.prototype.toString.call(x);

export const watchers: ({
  callback: () => any,
  dependencies: Set<symbol>,
})[] = [];


export function isPlainObject(x: unknown): x is Record<any, any>{
  return toString(x) === '[object Object]';
}