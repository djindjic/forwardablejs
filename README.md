<p align="left">
<a href="https://travis-ci.org/djindjic/forwardablejs">
  <img alt="Travis Status" src="http://img.shields.io/travis/djindjic/forwardablejs/master.svg?style=flat&amp;label=travis">
</a>

<a href="https://codeclimate.com/github/djindjic/forwardablejs">
  <img alt="Code Climate Score" src="http://img.shields.io/codeclimate/github/djindjic/forwardablejs.svg?style=flat">
</a>
</p>
  
forwardablejs
===========
ES6 lib for jspm inspired by Ruby Forwardable.

Basic usage:

```js
import {Forwardable} from 'lib/index';

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
class Delegator {
  constructor(receiver) {
    this._receiver = receiver;
    Forwardable.delegate(this, this._receiver, 'hello', 'hello_alias');
    Forwardable.delegate(this, this._receiver, 'name', 'name_alias');
    Forwardable.delegate(this, this._receiver, 'greet', 'greet_alias');
  }
}

let receiver = new Receiver();
let delegator = new Delegator(receiver);
delegator.hello_alias = 'hello';
delegator.name_alias = 'forwardablejs';

expect(delegator.greet_alias('github')).to.equal('hello forwardablejs, this is github');
```