'use strict';

import { PomodoroModel } from "./model/PomodoroModel.js";
import { PomodoroView } from "./view/PomodoroView.js";

export class App {
  constructor({startButton, pauseButton, resetButton, form, templateTimeButtons}) {
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    this.resetButton = resetButton;
    this.form = form;
    this.templateTimeButtons = templateTimeButtons;

    this.pomodoroModel = new PomodoroModel();
    this.pomodoroView = new PomodoroView();

    this.handleChange = this.handleChange.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTemplate = this.handleTemplate.bind(this);
  }

  handleStart() {
    this.pomodoroView.toggleButton(this.startButton, this.pauseButton, true);
    this.pomodoroModel.startTimer();
  }
  
  handlePause() {
    this.pomodoroModel.stopTimer();
  }
  
  handleReset() {
    this.pomodoroModel.stopTimer(true);
  }
  

  handleSetTimer(inputWork, inputBreak) {
    const inputWorkSec = parseInt(inputWork) * 60;
    const inputBreakSec = parseInt(inputBreak) * 60;
    this.pomodoroModel.setTimer({inputWorkSec, inputBreakSec});
  }

  handleSubmit(event) {
    event.preventDefault();

    const inputWork = this.form.querySelector('#js-work').value;
    const inputBreak = this.form.querySelector('#js-break').value;
    this.handleSetTimer(inputWork, inputBreak);
    this.form.reset();
  }

  handleTemplate(templateTimeButton) {
    this.handleSetTimer(templateTimeButton.dataset.work, templateTimeButton.dataset.break);
  }

  handleChange() {
    const time = this.pomodoroModel.getTime();
    const isStarted = this.pomodoroModel.getIsStarted();
    this.pomodoroView.displayTime(time);
    this.pomodoroView.toggleButton(this.startButton, this.pauseButton, isStarted);
  }
  
  mount() {
    this.pomodoroModel.onChange(this.handleChange);
    this.startButton.addEventListener('click', this.handleStart);
    this.pauseButton.addEventListener('click', this.handlePause);
    this.resetButton.addEventListener('click', this.handleReset);
    this.form.addEventListener('submit', this.handleSubmit);
    this.templateTimeButtons.forEach(templateTimeButton => 
      templateTimeButton.addEventListener('click', () => this.handleTemplate(templateTimeButton))
    );
  }
  
  unmount() {
    this.pomodoroModel.offChange(this.handleChange);
    this.startButton.removeListener('click', this.handleStart);
    this.pauseButton.removeListener('click', this.handlePause);
    this.resetButton.removeListener('click', this.handleReset);
    this.form.removeListener('submit', this.handleSubmit);
    this.templateTimeButtons.forEach(templateTimeButton => 
      templateTimeButton.removeListener('click', () => this.handleTemplate(templateTimeButton))
    );
  }
}