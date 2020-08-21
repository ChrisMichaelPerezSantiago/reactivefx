import 'mocha'
import { ref } from "../src/reactive";
import {expect} from 'chai'
import { IRef } from "../src/interfaces/IRef";


describe('reactivefx/ref', () => {
  it('should work with single number', () => {
    let arr = ref(1);
    expect(arr.value).to.equal(1);
  });
  it('should hold a value', () => {
    const k = ref(1)
    expect(k.value).to.equal(1);

    k.value = 2;
    expect(k.value).to.equal(2);
  });
  //it('should unwrap nested ref in types', () => {
  //  const a = ref(0)
  //  const b = ref(a)    
  //
  //  expect(typeof (b.value + 1)).to.be.an('number') // issue
  //});
  it('should unwrap nested ref in types', () => {
    const tuple: [number, string, { a: number }, () => number, IRef<number>] = [
      0, '1', { a: 1 }, () => 0, ref(0),
    ]
    const tupleRef = ref(tuple);
    tupleRef.value[0]++;
    expect(tupleRef.value[0]).to.equal(1);

    tupleRef.value[1] += '1';
    expect(tupleRef.value[1]).to.equal('11');
    
    tupleRef.value[2].a++;
    expect(tupleRef.value[2].a).to.equal(2);
    expect(tupleRef.value[3]()).to.equal(0);
    
    tupleRef.value[4].value++;
    expect(tupleRef.value[4].value).to.equal(1);
  });
});