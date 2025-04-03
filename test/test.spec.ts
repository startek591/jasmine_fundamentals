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
