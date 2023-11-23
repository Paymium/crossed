import { composeEventHandlers } from '../composeEventHandlers';

describe('Box', () => {
  test('init', async () => {
    const cbOne = jest.fn();
    const cbTwo = jest.fn();
    const callback = composeEventHandlers(cbOne, cbTwo);
    callback({});
    expect(cbOne).toHaveBeenCalled();
    expect(cbTwo).toHaveBeenCalled();
  });
});
