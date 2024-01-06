import { extract } from '../src/extract';

describe('extract', () => {
  describe('simple', () => {
    test('empty', async () => {
      expect(extract({})).toEqual({
        base: {},
        checked: {},
        readOnly: {},
        required: {},
        invalid: {},
        focus: {},
        focusVisible: {},
        hover: {},
        pressed: {},
        active: {},
        loading: {},
        disabled: {},
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
        checked: {},
        readOnly: {},
        required: {},
        invalid: {},
        focus: {},
        focusVisible: {},
        hover: { backgroundColor: 'white' },
        pressed: {},
        active: {},
        loading: {},
        disabled: {},
      });
    });

    test('checked', async () => {
      expect(
        extract({
          'backgroundColor': 'red',
          'checked:': { backgroundColor: 'white' },
        })
      ).toEqual({
        base: { backgroundColor: 'red' },
        checked: { backgroundColor: 'white' },
        readOnly: {},
        required: {},
        invalid: {},
        focus: {},
        focusVisible: {},
        hover: {},
        pressed: {},
        active: {},
        loading: {},
        disabled: {},
      });
    });
    test('readOnly', async () => {
      expect(
        extract({
          'backgroundColor': 'red',
          'readOnly:': { backgroundColor: 'white' },
        })
      ).toEqual({
        base: { backgroundColor: 'red' },
        checked: {},
        readOnly: { backgroundColor: 'white' },
        required: {},
        invalid: {},
        focus: {},
        focusVisible: {},
        hover: {},
        pressed: {},
        active: {},
        loading: {},
        disabled: {},
      });
    });
    test('required', async () => {
      expect(
        extract({
          'backgroundColor': 'red',
          'required:': { backgroundColor: 'white' },
        })
      ).toEqual({
        base: { backgroundColor: 'red' },
        checked: {},
        readOnly: {},
        required: { backgroundColor: 'white' },
        invalid: {},
        focus: {},
        focusVisible: {},
        hover: {},
        pressed: {},
        active: {},
        loading: {},
        disabled: {},
      });
    });
    test('invalid', async () => {
      expect(
        extract({
          'backgroundColor': 'red',
          'invalid:': { backgroundColor: 'white' },
        })
      ).toEqual({
        base: { backgroundColor: 'red' },
        checked: {},
        readOnly: {},
        required: {},
        invalid: { backgroundColor: 'white' },
        focus: {},
        focusVisible: {},
        hover: {},
        pressed: {},
        active: {},
        loading: {},
        disabled: {},
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
        checked: {},
        readOnly: {},
        required: {},
        invalid: {},
        focus: { backgroundColor: 'white' },
        focusVisible: {},
        hover: {},
        pressed: {},
        active: {},
        loading: {},
        disabled: {},
      });
    });
    test('focusVisible', async () => {
      expect(
        extract({
          'backgroundColor': 'red',
          'focusVisible:': { backgroundColor: 'white' },
        })
      ).toEqual({
        base: { backgroundColor: 'red' },
        checked: {},
        readOnly: {},
        required: {},
        invalid: {},
        focus: {},
        focusVisible: { backgroundColor: 'white' },
        hover: {},
        pressed: {},
        active: {},
        loading: {},
        disabled: {},
      });
    });
    test('pressed', async () => {
      expect(
        extract({
          'backgroundColor': 'red',
          'pressed:': { backgroundColor: 'white' },
        })
      ).toEqual({
        base: { backgroundColor: 'red' },
        checked: {},
        readOnly: {},
        required: {},
        invalid: {},
        focus: {},
        focusVisible: {},
        hover: {},
        pressed: { backgroundColor: 'white' },
        active: {},
        loading: {},
        disabled: {},
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
        checked: {},
        readOnly: {},
        required: {},
        invalid: {},
        focus: {},
        focusVisible: {},
        hover: {},
        pressed: {},
        active: { backgroundColor: 'white' },
        loading: {},
        disabled: {},
      });
    });
    test('loading', async () => {
      expect(
        extract({
          'backgroundColor': 'red',
          'loading:': { backgroundColor: 'white' },
        })
      ).toEqual({
        base: { backgroundColor: 'red' },
        checked: {},
        readOnly: {},
        required: {},
        invalid: {},
        focus: {},
        focusVisible: {},
        hover: {},
        pressed: {},
        active: {},
        loading: { backgroundColor: 'white' },
        disabled: {},
      });
    });
    test('disabled', async () => {
      expect(
        extract({
          'backgroundColor': 'red',
          'disabled:': { backgroundColor: 'white' },
        })
      ).toEqual({
        base: { backgroundColor: 'red' },
        checked: {},
        readOnly: {},
        required: {},
        invalid: {},
        focus: {},
        focusVisible: {},
        hover: {},
        pressed: {},
        active: {},
        loading: {},
        disabled: { backgroundColor: 'white' },
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
        checked: { variants: { color: { red: {} } } },
        readOnly: { variants: { color: { red: {} } } },
        required: { variants: { color: { red: {} } } },
        invalid: { variants: { color: { red: {} } } },
        focus: { variants: { color: { red: {} } } },
        focusVisible: { variants: { color: { red: {} } } },
        hover: {
          backgroundColor: 'white',
          variants: { color: { red: { backgroundColor: 'orange' } } },
        },
        pressed: { variants: { color: { red: {} } } },
        active: { variants: { color: { red: {} } } },
        loading: { variants: { color: { red: {} } } },
        disabled: { variants: { color: { red: {} } } },
      });
    });

    // test('checked', async () => {
    //   expect(
    //     extract({
    //       'backgroundColor': 'red',
    //       'checked:': { backgroundColor: 'white' },
    //     })
    //   ).toEqual({
    //     base: { backgroundColor: 'red' },
    //     checked: { backgroundColor: 'white' },
    //     readOnly: {},
    //     required: {},
    //     invalid: {},
    //     focus: {},
    //     focusVisible: {},
    //     hover: {},
    //     pressed: {},
    //     active: {},
    //     loading: {},
    //     disabled: {},
    //   });
    // });
    // test('readOnly', async () => {
    //   expect(
    //     extract({
    //       'backgroundColor': 'red',
    //       'readOnly:': { backgroundColor: 'white' },
    //     })
    //   ).toEqual({
    //     base: { backgroundColor: 'red' },
    //     checked: {},
    //     readOnly: { backgroundColor: 'white' },
    //     required: {},
    //     invalid: {},
    //     focus: {},
    //     focusVisible: {},
    //     hover: {},
    //     pressed: {},
    //     active: {},
    //     loading: {},
    //     disabled: {},
    //   });
    // });
    // test('required', async () => {
    //   expect(
    //     extract({
    //       'backgroundColor': 'red',
    //       'required:': { backgroundColor: 'white' },
    //     })
    //   ).toEqual({
    //     base: { backgroundColor: 'red' },
    //     checked: {},
    //     readOnly: {},
    //     required: { backgroundColor: 'white' },
    //     invalid: {},
    //     focus: {},
    //     focusVisible: {},
    //     hover: {},
    //     pressed: {},
    //     active: {},
    //     loading: {},
    //     disabled: {},
    //   });
    // });
    // test('invalid', async () => {
    //   expect(
    //     extract({
    //       'backgroundColor': 'red',
    //       'invalid:': { backgroundColor: 'white' },
    //     })
    //   ).toEqual({
    //     base: { backgroundColor: 'red' },
    //     checked: {},
    //     readOnly: {},
    //     required: {},
    //     invalid: { backgroundColor: 'white' },
    //     focus: {},
    //     focusVisible: {},
    //     hover: {},
    //     pressed: {},
    //     active: {},
    //     loading: {},
    //     disabled: {},
    //   });
    // });
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
    // test('pressed', async () => {
    //   expect(
    //     extract({
    //       'backgroundColor': 'red',
    //       'pressed:': { backgroundColor: 'white' },
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
    //     pressed: { backgroundColor: 'white' },
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
    // test('loading', async () => {
    //   expect(
    //     extract({
    //       'backgroundColor': 'red',
    //       'loading:': { backgroundColor: 'white' },
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
    //     active: {},
    //     loading: { backgroundColor: 'white' },
    //     disabled: {},
    //   });
    // });
    // test('disabled', async () => {
    //   expect(
    //     extract({
    //       'backgroundColor': 'red',
    //       'disabled:': { backgroundColor: 'white' },
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
    //     active: {},
    //     loading: {},
    //     disabled: { backgroundColor: 'white' },
    //   });
    // });
  });
});
