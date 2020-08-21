import _ from 'lodash';
import { watchers } from '../utils/index';


const dependencies = new Set<symbol>();

export const watch = (callback: () => any) => {
  const watcher = {
    callback: _.debounce(() => {
      dependencies.clear();
      callback();
      watcher.dependencies = new Set(dependencies);
    }, 0),
    dependencies: new Set<symbol>(),
  }

  watcher.callback();
  watchers.push(watcher);
}
