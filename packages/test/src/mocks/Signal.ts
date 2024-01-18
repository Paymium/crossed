export class Signal {
  private _value: boolean;
  constructor(e: boolean) {
    this._value = e;
  }
  get value() {
    return this._value;
  }
  set value(e) {
    this._value = e;
  }
}
