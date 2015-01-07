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

// 'getOwnPropertyDescriptors' in Object || (
//   Object.getOwnPropertyDescriptors = function (Object) {
//     var
//       gOPD    = Object.getOwnPropertyDescriptor,
//       gOPN    = Object.getOwnPropertyNames,
//       gOPS    = Object.getOwnPropertySymbols,
//       gNS     = gOPS ? function (object) {
//                          return gOPN(object).concat(gOPS(object));
//                        } :
//                        gOPN,
//       descriptors
//     ;
//     function copyFrom(key) {
//       descriptors[key] = gOPD(this, key);
//     }
//     return function getOwnPropertyDescriptors(object) {
//       var result = descriptors = {};
//       gNS(object).forEach(copyFrom, object);
//       descriptors = null;
//       return result;
//     };
//   }(Object)
// );
// 
// var shallowCopy = Object.create(
//   Object.getPrototypeOf(receiver),
//   Object.getOwnPropertyDescriptors(receiver)
// );