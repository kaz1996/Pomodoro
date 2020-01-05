'uset strict';

export class PomodoroView {
  displayTime(time) {
    const displayedTime = document.querySelector('#js-displayed-time');
    const hour = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    const adjustedHour = `${hour < 10 ? '0' : ''}${hour}`;
    const adjustedMinute = `${minutes < 10 ? '0' : ''}${minutes}`;
    const adjustedSeconds = `${seconds < 10 ? '0' : ''}${seconds}`;
    displayedTime.textContent = `${adjustedHour}:${adjustedMinute}:${adjustedSeconds}`;
  }

  toggleButton(startButton, pauseButton, isStarted) {
    if (isStarted) {
      startButton.classList.add('control__button--hidden');
      pauseButton.classList.remove('control__button--hidden');
    } else {
      startButton.classList.remove('control__button--hidden');
      pauseButton.classList.add('control__button--hidden');
    }
  }
}