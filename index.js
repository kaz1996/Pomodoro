'use strict';

import './src/assets/audio/bell.mp3'
import './src/scss/index.scss';
import { App } from ".//src/js/App";

const startButton = document.querySelector('#js-start-button');
const pauseButton = document.querySelector('#js-pause-button');
const resetButton = document.querySelector('#js-reset-button');
const form = document.querySelector('#js-form');
const templateTimeButtons = document.querySelectorAll('.template-button');

const app = new App({
  startButton,
  pauseButton,
  resetButton,
  form,
  templateTimeButtons
});

app.mount();