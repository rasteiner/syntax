/**
 * The MIT License (MIT)
 * Copyright (c) 2015-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

export const MODES = {
  LR0: 'LR0',
  SLR1: 'SLR1',
  LALR1: 'LALR1',
  LALR1_BY_SLR1: 'LALR1_BY_SLR1',
  LALR1_BY_CLR1: 'LALR1_BY_CLR1',
  LALR1_EXTENDED: 'LALR1_EXTENDED',
  CLR1: 'CLR1',
  LL1: 'LL1',
};

/**
 * Grammar/parser mode.
 */
export default class GrammarMode {

  constructor(mode = MODES.LR0) {
    mode = mode.toUpperCase();

    if (!MODES.hasOwnProperty(mode)) {
      throw new TypeError(
        `\n"${mode}" is not a valid parsing mode. ` +
        `Valid modes are: ${Object.keys(MODES).join(', ')}.\n`
      );
    }

    this._mode = mode;
  }

  getRaw() {
    return this._mode;
  }

  isLL() {
    return this._isMode(MODES.LL1);
  }

  isLR() {
    return !this.isLL();
  }

  usesLookaheadSet() {
    return this.isLALR1ByCLR1() || this.isCLR1();
  }

  isLR0() {
    return this._isMode(MODES.LR0);
  }

  isSLR1() {
    return this._isMode(MODES.SLR1);
  }

  isLALR1() {
    // Default algorithm for LALR(1) is "LALR(1) by SLR(1)".
    return this.isLALR1BySLR1() || this._isMode(MODES.LALR1);
  }

  isLALR1BySLR1() {
    return this._isMode(MODES.LALR1_BY_SLR1);
  }

  isLALR1ByCLR1() {
    return this._isMode(MODES.LALR1_BY_CLR1);
  }

  isLALR1Extended() {
    // Special grammar mode, where productions are built from
    // the LR(0) automation in the "LALR(1) by SLR(1)" algorithm.
    return this._isMode(MODES.LALR1_EXTENDED);
  }

  isCLR1() {
    return this._isMode(MODES.CLR1);
  }

  _isMode(mode) {
    return this._mode === mode;
  }

  /**
   * Returns string representation of a mode.
   * LR0 -> LR(0)
   */
  toString() {
    return `${this._mode.slice(0, -1)}(${this._mode[this._mode.length - 1]})`;
  }
}