function composeEventHandlers<E>(
  originalEventHandler?: (_event: E) => void,
  ourEventHandler?: null | ((_event: E) => void),
  { checkForDefaultPrevented = true } = {}
) {
  return function handleEvent(event: E) {
    originalEventHandler?.(event);

    if (
      checkForDefaultPrevented === false ||
      !(event as unknown as Event).defaultPrevented
    ) {
      return ourEventHandler?.(event);
    }
  };
}

export { composeEventHandlers };
