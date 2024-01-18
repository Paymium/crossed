import { extract } from '../src/extract';

describe('extract', () => {
  describe('simple', () => {
    test('empty', async () => {
      expect(extract({})).toEqual({
        base: {},
        focus: {},
        hover: {},
        active: {},
      });
    });

    test('hover', async () => {
      expect(
        extract({
          'backgroundColor': 'red',
          'hover:': { backgroundColor: 'white' },
        })
      ).toEqual({
        base: { backgroundColor: 'red' },
        focus: {},
        hover: { backgroundColor: 'white' },
        active: {},
      });
    });

    test('focus', async () => {
      expect(
        extract({
          'backgroundColor': 'red',
          'focus:': { backgroundColor: 'white' },
        })
      ).toEqual({
        base: { backgroundColor: 'red' },
        focus: { backgroundColor: 'white' },
        hover: {},
        active: {},
      });
    });
    test('active', async () => {
      expect(
        extract({
          'backgroundColor': 'red',
          'active:': { backgroundColor: 'white' },
        })
      ).toEqual({
        base: { backgroundColor: 'red' },
        focus: {},
        hover: {},
        active: { backgroundColor: 'white' },
      });
    });
  });

  describe('with variant', () => {
    test('hover', async () => {
      expect(
        extract({
          'backgroundColor': 'gray',
          'hover:': { backgroundColor: 'white' },
          'variants': {
            color: {
              red: {
                'backgroundColor': 'red',
                'hover:': { backgroundColor: 'orange' },
              },
            },
          },
        })
      ).toEqual({
        base: {
          backgroundColor: 'gray',
          variants: { color: { red: { backgroundColor: 'red' } } },
        },
        focus: {},
        hover: {
          backgroundColor: 'white',
          variants: { color: { red: { backgroundColor: 'orange' } } },
        },
        active: {},
      });
    });

    // test('focus', async () => {
    //   expect(
    //     extract({
    //       'backgroundColor': 'red',
    //       'focus:': { backgroundColor: 'white' },
    //     })
    //   ).toEqual({
    //     base: { backgroundColor: 'red' },
    //     checked: {},
    //     readOnly: {},
    //     required: {},
    //     invalid: {},
    //     focus: { backgroundColor: 'white' },
    //     focusVisible: {},
    //     hover: {},
    //     pressed: {},
    //     active: {},
    //     loading: {},
    //     disabled: {},
    //   });
    // });
    // test('focusVisible', async () => {
    //   expect(
    //     extract({
    //       'backgroundColor': 'red',
    //       'focusVisible:': { backgroundColor: 'white' },
    //     })
    //   ).toEqual({
    //     base: { backgroundColor: 'red' },
    //     checked: {},
    //     readOnly: {},
    //     required: {},
    //     invalid: {},
    //     focus: {},
    //     focusVisible: { backgroundColor: 'white' },
    //     hover: {},
    //     pressed: {},
    //     active: {},
    //     loading: {},
    //     disabled: {},
    //   });
    // });
    // test('active', async () => {
    //   expect(
    //     extract({
    //       'backgroundColor': 'red',
    //       'active:': { backgroundColor: 'white' },
    //     })
    //   ).toEqual({
    //     base: { backgroundColor: 'red' },
    //     checked: {},
    //     readOnly: {},
    //     required: {},
    //     invalid: {},
    //     focus: {},
    //     focusVisible: {},
    //     hover: {},
    //     pressed: {},
    //     active: { backgroundColor: 'white' },
    //     loading: {},
    //     disabled: {},
    //   });
    // });
  });
});
