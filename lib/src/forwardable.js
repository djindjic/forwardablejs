export class Forwardable {
  static delegate(host, receiver, method, alias = method) {
    let prop = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(receiver), method);
    let newProp = {};

    if (prop.get) newProp.get = () => receiver[method]; 
    if (prop.set) newProp.set = value => receiver[method] = value;
    if (prop.value) newProp.value = (...args) => receiver[method](...args);

    Object.defineProperty(host, alias, newProp);
  }
}