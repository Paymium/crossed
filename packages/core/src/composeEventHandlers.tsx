type Events = Object;

export type EventHandler<E extends Events> = (event: E) => void;

export function composeEventHandlers<E extends Events>(
  og?: EventHandler<E> | null | false,
  next?: EventHandler<E> | null | false,
  { checkDefaultPrevented = true } = {}
) {
  if (!og || !next) {
    return next || og;
  }
  return function composedEventHandler(event: E) {
    og?.(event);
    if (
      !event ||
      !(checkDefaultPrevented && 'defaultPrevented' in event) ||
      // @ts-ignore
      ('defaultPrevented' in event && !event.defaultPrevented)
    ) {
      return next?.(event);
    }
  };
}
