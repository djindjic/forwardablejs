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
    class Receiver {
      get hello() { return 'hello world'; }
    }
    class Temp {
      constructor(receiver) {
        this._receiver = receiver;
        this.delegate('_receiver', 'hello');
      }
    }
    Object.assign(Temp.prototype, Forwardable.prototype);

    let receiver = new Receiver();
    let temp = new Temp(receiver);

    expect(temp.hello).to.equal('hello world');
  });

  it('delegate set and get property to receiver', function() {
    class Receiver {
      constructor() { this._hello = ''; }
      get hello() { return this._hello; }
      set hello(value) { this._hello = value; }
    }
    class Temp {
      constructor(receiver) {
        this._receiver = receiver;
        this.delegate('_receiver', 'hello');
      }
    }
    Object.assign(Temp.prototype, Forwardable.prototype);

    let receiver = new Receiver();
    let temp = new Temp(receiver);
    temp.hello = 'hello receiver';

    expect(temp.hello).to.equal('hello receiver');
  });

  it('delegate set and get properties and methods to receiver', function() {
    class Receiver {
      constructor() { this._name = ''; this._hello = ''; }
      get name() { return this._name; }
      set name(value) { this._name = value; }
      get hello() { return this._hello; }
      set hello(value) { this._hello = value; }
      greet(location) {
        return `${this._hello} ${this._name}, this is ${location}`;
      }
    }
    class Temp {
      constructor(receiver) {
        this._receiver = receiver;
        this.delegate('_receiver', 'hello');
        this.delegate('_receiver', 'name');
        this.delegate('_receiver', 'greet');
      }
    }
    Object.assign(Temp.prototype, Forwardable.prototype);

    let receiver = new Receiver();
    let temp = new Temp(receiver);
    temp.hello = 'hello';
    temp.name = 'forwardablejs';

    expect(temp.greet('github')).to.equal('hello forwardablejs, this is github');
  });
});