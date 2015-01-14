import {
  Forwardable
} from 'lib/index';

describe('Forwardable', function() {
  it('has static method delegate', function() {
    expect(Forwardable).itself.to.respondTo('delegate');
  });

  it('delegate method to receiver', function() {
    class Temp {
      constructor() {
        this._records = [];
        Forwardable.delegate(this, this._records, 'push');
      }

      get records() {
        return this._records;
      }
    }

    let temp = new Temp();
    temp.push('first element');

    expect(temp.records).to.deep.equal(['first element']);
  });

  it('delegate method to receiver with alias', function() {
    class Temp {
      constructor() {
        this._records = [];
        Forwardable.delegate(this, this._records, 'push', 'add');
      }

      get records() {
        return this._records;
      }
    }

    let temp = new Temp();
    temp.add('first element');

    expect(temp.records).to.deep.equal(['first element']);
  });


  it('delegate get property to receiver', function() {
    class Receiver {
      get hello() { return 'hello world'; }
    }
    class Temp {
      constructor(receiver) {
        this._receiver = receiver;
        Forwardable.delegate(this, this._receiver, 'hello');
      }
    }

    let receiver = new Receiver();
    let temp = new Temp(receiver);

    expect(temp.hello).to.equal('hello world');
  });

  it('delegate set and get properties to receiver', function() {
    class Receiver {
      constructor() { this._hello = ''; }
      get hello() { return this._hello; }
      set hello(value) { this._hello = value; }
    }
    class Temp {
      constructor(receiver) {
        this._receiver = receiver;
        Forwardable.delegate(this, this._receiver, 'hello');
      }
    }

    let receiver = new Receiver();
    let temp = new Temp(receiver);
    temp.hello = 'hello receiver';

    expect(temp.hello).to.equal('hello receiver');
  });

  it('delegate set and get properties and method by their aliases to receiver', function() {
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
        Forwardable.delegate(this, this._receiver, 'hello', 'hello_alias');
        Forwardable.delegate(this, this._receiver, 'name', 'name_alias');
        Forwardable.delegate(this, this._receiver, 'greet', 'greet_alias');
      }
    }

    let receiver = new Receiver();
    let temp = new Temp(receiver);
    temp.hello_alias = 'hello';
    temp.name_alias = 'forwardablejs';

    expect(temp.greet_alias('github')).to.equal('hello forwardablejs, this is github');
  });
});