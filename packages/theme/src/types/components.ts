/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

type Banner = {
  title: string;
  subtitle: string;
  icon: string;
  background: string;
  backgroundIcon: string;
  border: string;
};
type Alert = {
  icon: string;
  text: string;
  background: string;
  border: string;
};

type Action = {
  text: string;
  icon: string;
  background: string;
  border: string;
};
type Input = {
  text: string;
  icon: string;
  background: string;
  border: string;
  placeholder: string;
};

type Card = {
  background: string;
  title: string;
  description: string;
  border: string;
};
type Tag = {
  background: string;
  text: string;
};

type ActionType<T = Action> = {
  default: T;
  hover: T;
  active: T;
  disabled: T;
  focus: T;
};
type InputType = {
  default: Input;
  hover: Input;
  active: Input;
  disabled: Input;
  focus: Input;
};
// type ActionIconType<T = Pick<Action, 'icon' | 'background'>> = {
//   default: T;
//   hover: T;
//   active: T;
//   disabled: T;
//   focus: T;
// };

export type Components = {
  Banner: { success: Banner; info: Banner; warning: Banner; error: Banner };
  Action: {
    primary: ActionType;
    secondary: ActionType;
    tertiary: ActionType;
    icon: ActionType<{ color: string; background: string; border: string }>;
  };
  Alert: {
    success: Alert;
    info: Alert;
    warning: Alert;
    error: Alert;
  };
  Input: { primary: InputType };
  Card: {
    default: Card;
    hover: Card;
    active: Card;
  };
  Tag: {
    default: Tag;
    green: Tag;
    red: Tag;
  };
};
