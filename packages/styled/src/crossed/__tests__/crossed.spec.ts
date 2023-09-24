import { crossed } from '../index';

const result = (d: any) => {
  return {
    'props': undefined,
    ':active': undefined,
    ':focus': undefined,
    ':hover': undefined,
    ':light': undefined,
    ':dark': undefined,
    ':disabled': undefined,
    ...d,
  };
};

describe('crossed', () => {
  test('undefined', () => {
    expect(crossed()()).toEqual(undefined);
  });

  test('empty', () => {
    expect(crossed({})()).toEqual({});
  });

  test('variant', () => {
    const variant = crossed({
      className: ['text-red-100'],
      props: undefined,
      variants: {
        toto: {
          true: {
            className: ['text-red-200'],
          },
        },
      },
    });
    expect(variant({ toto: false })).toEqual(
      result({ className: ['text-red-100'], toto: false })
    );
    expect(variant({ toto: true })).toEqual(
      result({ className: ['text-red-200'], toto: true })
    );
    expect(variant({ toto: undefined })).toEqual(
      result({ className: ['text-red-100'], toto: undefined })
    );
  });

  test('compound variant', () => {
    const variant = crossed({
      className: ['text-red-100'],
      props: undefined,
      variants: {
        toto: {
          true: {
            className: ['text-red-200'],
          },
        },
        foo: {
          true: {
            className: ['text-red-100'],
          },
          false: {
            className: ['text-red-300'],
          },
        },
      },
      compoundVariants: [
        {
          foo: true,
          toto: false,
          className: ['text-red-700'],
        },
        {
          foo: true,
          toto: true,
          className: ['text-red-800'],
        },
        {
          foo: [true],
          toto: true,
          className: ['text-red-900'],
        },
      ],
    });
    expect(variant({ toto: false, foo: false })).toEqual(
      result({ className: ['text-red-300'], foo: false, toto: false })
    );
    expect(variant({ toto: false, foo: true })).toEqual(
      result({ className: ['text-red-700'], foo: true, toto: false })
    );
    expect(variant({ toto: true, foo: true })).toEqual(
      result({ className: ['text-red-900'], foo: true, toto: true })
    );
  });

  test('default variant', () => {
    const variant = crossed({
      className: ['text-red-100'],
      props: undefined,
      variants: {
        toto: {
          true: {
            className: ['text-red-200'],
          },
          false: {
            className: ['text-red-500'],
          },
        },
      },
      defaultVariants: {
        toto: true,
      },
    });
    expect(variant()).toEqual(result({ className: ['text-red-200'] }));
  });
});
