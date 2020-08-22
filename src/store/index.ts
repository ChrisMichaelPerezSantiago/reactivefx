import { reactive, computed} from '../reactive';
//import { registerModules } from './modules/register';


export class Store{
  state: any;
  mutations: any;
  actions: any;
  getters: {};

  constructor(options){
    let state = reactive(options.state);
    //if(options.modules){
    //  state = registerModules(options.modules , state);
    //}
    if(options.state){
      this.state = reactive(state)
    }
    if(options.mutations){
      this.mutations = options.mutations;
    }
    if(options.actions){
      this.actions = options.actions;
    }
    //if(options.getters){
    //  this.getters = {};
    //  const {getters} = options;
    //  for(const [handle , fn] of Object.entries(getters)){
    //    Object.defineProperty(this.getters , handle , {
    //      get: () => computed(() => fn(this.state)).value,
    //      enumerable: true
    //    });
    //  }
    //}
  }

  commit(handle , payload){
    const mutation = this.mutations[handle];
    if(!mutation){
      throw Error(`[storefx]: ${handle} is not defined.`);
    }
    mutation(this.state , payload);
  }

  dispatch(handle , payload){
    const action = this.actions[handle];
    const call = action(this , payload);
    if(!call || !typeof call.then){
      return Promise.resolve(call)
    }
    return call;
  }
}
