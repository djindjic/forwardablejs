export class Forwardable {
  constructor() {}
  delegate(receiver, method) {
    this[method] = function(...args) {
      (this[receiver])[method].apply(this[receiver], args);
    };
  }
}