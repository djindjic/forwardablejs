export class Forwardable {
  delegate(receiver, method, alias) {
    alias = alias || method
    let prop = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this[receiver]), method);
    let newProp = {};
    if (prop.get || prop.set) {
      if (prop.get) {
        newProp.get = function() {
          return this[receiver][method]; 
        };
      }
      if (prop.set) {
        newProp.set = function(value) {
          this[receiver][method] = value;
        };  
      }
    }
    if (prop.value) {
      newProp.value = function(...args) {
        return this[receiver][method](...args);
      };
    }
    Object.defineProperty(this, alias, newProp);
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