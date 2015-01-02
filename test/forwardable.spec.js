import {
  Forwardable
} from 'lib/index';

describe('Forwardable', function(){
  it('has method delegate', function(){
    let fwd = new Forwardable();
    expect(fwd).to.respondTo('delegate');
  });

  it('assigns class with delegate method', function(){
    class Temp {
      constructor() {
        
      }
    }
    Object.assign(Temp.prototype, Forwardable.prototype);
    let temp = new Temp();

    expect(temp).to.respondTo('delegate');
  });

  it('delegate method to receiver', function(){
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
});