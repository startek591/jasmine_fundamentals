describe('A suite', function () {
  it('contains a spec with an expectation', function () {
    expect(true).toBe(true);
  });
});

describe('A suite is just a function', function () {
  let a;

  it('and so is a spec', function () {
    a = true;
    expect(a).toBe(true);
  });
});

describe("The 'toBe' matcher compares with ===", function () {
  it('and has a positive case', function () {
    expect(true).toBe(true);
  });

  it('and can have a negative case', function () {
    expect(false).not.toBe(true);
  });
});

describe('A suite with some shared setup', function () {
  let foo = 0;

  beforeEach(function () {
    foo += 1;
  });

  afterEach(function () {
    foo = 0;
  });

  beforeAll(function () {
    foo = 1;
  });

  afterAll(function () {
    foo = 0;
  });

  it('should do something', () => {
    expect(true).toBe(true);
  });

  describe('A spec', function () {
    beforeEach(function () {
      this.foo = 0;
    });

    it('can ise the `this` to share state', function () {
      expect(this.foo).toEqual(0);
      this.bar = 'test pollution';
    });

    it('prevent test pollution by having an empty `this` created for the next spec', function () {
      expect(this.foo).toEqual(0);
      expect(this.bar).toBe(undefined);
    });
  });

  describe('A spec using the fail function', function () {
    function foo(x, callback) {
      if (x) {
        callback();
      }
    }

    it('should not call the callBack', function () {
      foo(false, function () {
        fail('Callback has been called');
      });
    });
  });

  describe('A spec 2', function () {
    let foo;

    beforeEach(function () {
      foo = 0;
      foo += 1;
    });

    afterEach(function () {
      foo = 0;
    });

    it('is just a function, so it can contain any code', function () {
      expect(foo).toEqual(1);
      expect(true).toEqual(true);
    });

    describe('nested inside a second describe', function () {
      let bar;
      beforeEach(function () {
        bar = 1;
      });

      it('can reference both scopes as needed', function () {
        expect(foo).toEqual(bar);
      });
    });
  });

  xdescribe('A spec 3', function () {
    let foo;

    beforeEach(function () {
      foo = 0;
      foo += 1;
    });

    it('is just a function so it can contain any code', function () {
      expect(foo).toEqual(1);
    });
  });

  describe('Pending spec', function () {
    xit("can be declared 'xit'", function () {
      expect(true).toBe(false);
    });

    it("can de declared with 'it' but without a function");

    it("can be declared by calling 'pending' in the spec body", function () {
      expect(true).toBe(true);
      pending('this is why it is pending');
    });
  });
});

describe('Async/Await Example', () => {
  async function fetchData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('data received');
      }, 100);
    });
  }

  it('should resolve data using async/await', async () => {
    const data = await fetchData();
    expect(data).toBe('data received');
  });

  it('should handle rejection with try/catch', async () => {
    async function fetchWithError() {
      return new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('fail'));
        }, 100);
      });
    }
    try {
      await fetchWithError();
      fail('Expected an error to be thrown');
    } catch (error) {
      expect(error.message).toBe('fail');
    }
  });
});

describe('long asynchronous specs', function () {
  function somethingSlow() {
    return console.log('\ncall somethingSlow');
  }

  function somethingReallySlow() {
    return console.log('call somethingReallySlow');
  }

  beforeEach(async function () {
    await somethingSlow();
  }, 1000);

  it('takes a long time', async function () {
    await somethingReallySlow();
  }, 10000);

  afterEach(async function () {
    await somethingSlow();
  }, 1000);
});

describe('A spy', function () {
  let foo;
  let bar = null;

  beforeEach(function () {
    foo = {
      setBar: function (value) {
        bar = value;
      },
    };

    spyOn(foo, 'setBar');

    foo.setBar(123);
    foo.setBar(456, 'another param');
  });

  it('tracks that the spy was called', function () {
    expect(foo.setBar).toHaveBeenCalled();
  });

  it('tracks that the spay was called', function () {
    expect(foo.setBar).toHaveBeenCalledTimes(2);
  });

  it('tracks all the arguments of its calls', function () {
    expect(foo.setBar).toHaveBeenCalledWith(123);
    expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
  });

  it('track if it was called at all', function () {
    foo.setBar();
    expect(foo.setBar.calls.any()).toEqual(true);
  });
});

describe('A spy when created manually', function () {
  let whatAmI;

  beforeEach(function () {
    whatAmI = jasmine.createSpy('whatAmI');
    whatAmI('I', 'am', 'a', 'spy');
  });

  it('tracks that the spy was called', function () {
    expect(whatAmI).toHaveBeenCalled();
  });
});

describe('Multiple spies, when created manually', function () {
  let tape;

  beforeEach(function () {
    tape = jasmine.createSpyObj('tape', [
      'play',
      'pause',
      'stop',
      'rewind',
    ]);

    tape.play();
    tape.pause();
    tape.rewind(0);
  });

  it('creates spies for each requested function', function () {
    expect(tape.play).toBeDefined();
    expect(tape.pause).toBeDefined();
    expect(tape.stop).toBeDefined();
    expect(tape.rewind).toBeDefined();
  });
});

describe('Matching with finesse', function () {
  describe('jasmine.any', function () {
    it('matches any value', function () {
      expect({}).toEqual(jasmine.any(Object));
      expect(12).toEqual(jasmine.any(Number));
    });

    describe('when used with a spy', function () {
      it('is useful for comparing arugments', function () {
        const foo = jasmine.createSpy('foo');
        foo(12, function () {
          return true;
        });
      });
    });
  });

  describe('jasmine.anything', function () {
    it('matches anything', function () {
      expect(1).toEqual(jasmine.anything());
    });

    describe('When used with a spy', function () {
      it('is useful when the argument can be ignored', function () {
        const foo = jasmine.createSpy('foo');
        foo(12, function () {
          return false;
        });
        expect(foo).toHaveBeenCalledWith(12, jasmine.anything());
      });
    });
  });

  describe('jasmine.objectContaining', function () {
    let foo;

    beforeEach(function () {
      foo = {
        a: 1,
        b: 1,
        bar: 'baz',
      };
    });

    it('matches objects with the expect key/value pairs', function () {
      expect(foo).toEqual(
        jasmine.objectContaining({
          bar: 'baz',
        })
      );
    });

    describe('when use with a spy', function () {
      it('is useful for comparing arugments', function () {
        const callback = jasmine.createSpy('callback');

        callback({
          bar: 'baz',
        });

        expect(callback).toHaveBeenCalledWith(
          jasmine.objectContaining({ bar: 'baz' })
        );
      });
    });
  });

  describe('jasmine.arrayContaining', function () {
    let foo;
    beforeEach(function () {
      foo = [1, 2, 3, 4];
    });

    it('matches arrays with some of the values', function () {
      expect(foo).toEqual(jasmine.arrayContaining([3, 1]));
      expect(foo).not.toEqual(jasmine.arrayContaining([6]));
    });

    describe('when used with a spy', function () {
      it('is useful when comparing arguments', function () {
        const callback = jasmine.createSpy('callback');
        callback([1, 2, 3, 4]);

        expect(callback).toHaveBeenCalledWith(
          jasmine.arrayContaining([4, 2, 3])
        );

        expect(callback).not.toHaveBeenCalledWith(
          jasmine.arrayContaining([5, 2])
        );
      });
    });
  });

  describe('jasmine.stringMatching', function () {
    it('matches as a regexp', function () {
      expect({ foo: 'bar' }).toEqual({
        foo: jasmine.stringMatching(/^bar$/),
      });
      expect({ foo: 'foobarbaz' }).toEqual({
        foo: jasmine.stringMatching('bar'),
      });
    });

    describe('when used with a spy', function () {
      it('is useful for comparing arguments', function () {
        const callback = jasmine.createSpy('callback');

        callback('foobarbaz');

        expect(callback).toHaveBeenCalledWith(
          jasmine.stringMatching('bar')
        );

        expect(callback).not.toHaveBeenCalledWith(
          jasmine.stringMatching(/^bar$/)
        );
      });
    });
  });
  describe('custom asymmetry', function () {
    const tester = {
      asymmetricMatch: function (actual) {
        const secondValue = actual.split(',')[1];
        return secondValue === 'bar';
      },
    };

    it('dives in deep', function () {
      expect('foo,bar,baz,quux').toEqual(tester);
    });
  });
});
