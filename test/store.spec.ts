import 'mocha';

import {expect} from 'chai';
import { reactive } from '../src/reactive'
import { Store } from '../src/store/index';


const createStore = () => new Store({
  state: reactive({
    count: 1
  }),
  mutations:{
    INCREMENT(state , payload){
      state.count += payload;
    }
  },
  actions:{
    increment(context , payload){
      context.commit('INCREMENT' , payload)
    }
  },
  getters:{
    triple: state => state.count * 3
  }
});

describe('reactivefx/store', () => {
  it('Commit mutation', () => {
    const s = createStore();
    s.commit('INCREMENT', 5);
    expect(s.state.count).to.equal(6);
  });
  it('Dispatch action', () => {
    const s = createStore();
    return s.dispatch('increment', 1)
      .then(() => expect(s.state.count).to.equal(2));
  });
});

