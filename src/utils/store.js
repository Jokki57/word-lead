class Store {
  constructor() {
    this.state = {};
  }

  setValue = (key, value) => {
    this.state[key] = value;
  };

  getValue = (key) => this.state[key];

  getState = () => this.state;
}

const store = new Store();

export default store;
