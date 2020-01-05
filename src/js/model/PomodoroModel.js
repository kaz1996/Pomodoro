'use strict';

import { EventEmitter } from "events";

export class PomodoroModel extends EventEmitter {
  constructor() {
    super();

    this.isStarted = false;
    this.timer;
    this.workSec = 0;
    this.breakSec = 0;
  }

  onChange(listener) {
    this.addListener('change', listener);
  }

  offChange(listener) {
    this.removeListener('change', listener);
  }

  emitChange() {
    this.emit('change');
  }

  getIsStarted() {
    return this.isStarted;
  }

  getTime() {
    return this.workSec < 0 ? this.breakSec: this.workSec;
  }

  setTimer({inputWorkSec, inputBreakSec}) {
    this.stopTimer();
    this.workSec = inputWorkSec;
    this.breakSec = inputBreakSec;
    this.emitChange();
  }

  startTimer() {
    if (this.workSec <= 0 || this.breakSec <= 0) {
      alert('タイマーをセットしてください。');
      this.emitChange();
      return;
    }

    this.isStarted = true;
    this.timer = setInterval(() => {
      this.countdownTimer();
      this.emitChange();
    }, 1000);
  }
  
  stopTimer(reset = false) {
    if (reset === true) {
      this.workSec = 0;
      this.breakSec = 0;
    }
    clearInterval(this.timer);
    this.isStarted = false;
    this.emitChange();
  }

  countdownTimer() {
    if (this.breakSec <= 0) {
      this.alertFinish();
      this.stopTimer();
      return;
    }
    if (this.workSec < 0) {
      this.breakSec--;
      return;
    }
    this.workSec--;
    this.alertFinish();
  }

  alertFinish() {
    if (this.workSec === 0 || this.breakSec === 0) {
      const audio = new Audio('audio/bell.mp3');
      audio.play()
    }
  }
}