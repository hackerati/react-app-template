let PropTypes = {
  store: createStoreChecker()
};

function createStoreChecker() {
  return function (props, propName, componentName) {
    let store_properties = Object.keys(props[propName]);
    const required_methods = ['getState', 'dispatch', 'subscribe', 'replaceReducer'];
    for (let method of required_methods) {
      if (store_properties.find(method) < 0) {
        return new Error(`store requires the ${method} method in ${componentName}.`);
      }
    }
  }
}

export default PropTypes;
