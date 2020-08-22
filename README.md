<p align="center">
    <img src="./assets/img/reactive.png" />
</p>

<p align="center">
  A Universal Reactive API compatible with any application written in Typescript or Javascript.
</p>

<p align="center">
  <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-greencolor=42b883.svg" />          
  <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellowcolor=42b883.svg" />
</p>

<br/>
<br/>
<br/>

> :bulb: Project in premature state, contributors are more than welcome


## Supported

> :white_check_mark: Support &nbsp;&nbsp;&nbsp;&nbsp;:x: Not Supported &nbsp;&nbsp;⚠️ Issue


### :white_check_mark: `reactive`


### :white_check_mark: `ref`

- ⚠️ *Warning: Operator '+' cannot be applied to types 'IRef<number>' and 'number'.*
```ts
const a = ref(0);
const b = ref(a);    

expect(typeof (b.value + 1)).to.be.an('number');
```

- ⚠️ *Warning: handling Array, Set, Map*


### :white_check_mark: `computed`

### :white_check_mark: `watch`

---

## Store
A optional state management pattern.


### :white_check_mark: `new Store({})`
The `Store consists of four objects. The four objects are the `state, `actions`, `mutations` and `getters`.

- `getters` :x: not supported yet

```ts
const createStore = () => new Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {}
});
```

- The `state` is an object that contains the state of the application data.
  - It can even be `reactive`

```js
state: {
  count: 1 // or state: reactive({count: 1})
}
```

- `Mutations` is also an object that contains methods that affect the state and only care to control the states, to manipulate it. A mutation may have two arguments as state and payload:


  - [x] **state** has the current state of an application.
  - [x] **payload** is an optional one, which will give the data to mutate.

```js
mutations: {
  INCREMENT(state , payload){
     state.count += payload;
  }
}
```

- `Actions` are methods used to cause mutations and execute asynchronous code. Responsible for preparing everything necessary for a mutation to confirm a change in the state.

```ts
actions:{
  increment(context , payload){
    context.commit('INCREMENT' , payload) // increment state.count by payload value
  }
}
```

- `Getters` contain the methods used to abstract access to the state and to do some preprocessing tasks, if necessary (data calculation, filtering, etc …), ⚠️ examples not available now.

---




## **:handshake: Contributing**

- Fork it!
- Create your feature branch: `git checkout -b my-new-feature`
- Commit your changes: `git commit -am 'Add some feature'`
- Push to the branch: `git push origin my-new-feature`
- Submit a pull request

---

### **:busts_in_silhouette: Credits**

- [Chris Michael](https://github.com/ChrisMichaelPerezSantiago) (Project Leader, and Developer)

---

### **:anger: Troubleshootings**

This is just a personal project created for study / demonstration purpose and to simplify my working life, it may or may
not be a good fit for your project(s).

---

### **:heart: Show your support**

Please :star: this repository if you like it or this project helped you!\
Feel free to open issues or submit pull-requests to help me improving my work.


---


### **:robot: Author**

_*Chris Michael*_

> You can follow me on
[github](https://github.com/ChrisMichaelPerezSantiago)&nbsp;&middot;&nbsp;[twitter](https://twitter.com/Chris5855M)

---

Copyright ©2020 [Reactivefx](https://github.com/ChrisMichaelPerezSantiago/reactivefx).
