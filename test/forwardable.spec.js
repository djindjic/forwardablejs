import {
  Forwardable
} from 'lib/index';

describe('Forwardable', function() {
  it('has method delegate', function() {
    let fwd = new Forwardable();
    expect(fwd).to.respondTo('delegate');
  });

  it('assigns class with delegate method', function() {
    class Temp {
      constructor() {
        
      }
    }
    Object.assign(Temp.prototype, Forwardable.prototype);
    let temp = new Temp();

    expect(temp).to.respondTo('delegate');
  });

  it('delegate method to receiver', function() {
    class Temp {
      constructor() {
        this._records = [];
        this.delegate('_records', 'push');
      }

      get records() {
        return this._records;
      }
    }
    Object.assign(Temp.prototype, Forwardable.prototype);

    let temp = new Temp();
    temp.push('first element');

    expect(temp.records).to.deep.equal(['first element']);
  });

  it('delegate get property to receiver', function() {
    'getOwnPropertyDescriptors' in Object || (
      Object.getOwnPropertyDescriptors = function (Object) {
        var
          gOPD    = Object.getOwnPropertyDescriptor,
          gOPN    = Object.getOwnPropertyNames,
          gOPS    = Object.getOwnPropertySymbols,
          gNS     = gOPS ? function (object) {
                             return gOPN(object).concat(gOPS(object));
                           } :
                           gOPN,
          descriptors
        ;
        function copyFrom(key) {
          descriptors[key] = gOPD(this, key);
        }
        return function getOwnPropertyDescriptors(object) {
          var result = descriptors = {};
          gNS(object).forEach(copyFrom, object);
          descriptors = null;
          return result;
        };
      }(Object)
    );

    class Receiver {
      // constructor() { this._hello = ''; }
      set hello(value) { this._hello = value; }
      get hello() { return this._hello; }
    }
    class Temp {
      constructor(receiver) {
        this._receiver = receiver;
        this.delegate('_receiver', 'hello');
      }
    }
    Object.assign(Temp.prototype, Forwardable.prototype);

    let receiver = new Receiver();
    let d = Object.getOwnPropertyDescriptors(receiver);
    for(elem in d) {
      console.log('----');
      console.log(elem);
    }

    receiver.hello = 'bbb';
    var shallowCopy = Object.create(
      Object.getPrototypeOf(receiver),
      Object.getOwnPropertyDescriptors(receiver)
    );

    receiver.hello = 'aaa';
    console.log(receiver.hello);
    console.log(shallowCopy.hello);
    // for(var p in receiver)
    // {
    //   console.log(p + ": " + receiver[p]); //if you have installed Firebug.
    // }
    // console.log(receiver);
    let temp = new Temp(receiver);

    expect(temp).to.equal('hello');
  });
});