export default class Carousel {
  constructor(carouselSelector, buttonToRight, buttonToLeft, activeSlide, centerSlide, rightSlide, activeControl, centerControl, rightControl) {
    this._carouselSelector = document.querySelector(carouselSelector);
    this._buttonToRight = document.querySelector(buttonToRight);
    this._buttonToLeft = document.querySelector(buttonToLeft);
    this._activeSlide = this._carouselSelector.querySelector(activeSlide);
    this._centerSlide = this._carouselSelector.querySelector(centerSlide);
    this._rightSlide = this._carouselSelector.querySelector(rightSlide);
    this._activeControl = document.querySelector(activeControl);
    this._centerControl = document.querySelector(centerControl);
    this._rightControl = document.querySelector(rightControl);
    this._currentState = 'active-slide';
    this._progress = 0;
    this._pausedTime = 0;
    this._pausedProgress = 0;
    this._activeControl.classList.add('progress-fill');
    this._moveForward = this._moveForward.bind(this);
    this._moveBack = this._moveBack.bind(this);
    this._allowMoving = this._allowMoving.bind(this);
    this._setEventListeners();
  }

  _startAutoScroll() {
    this._autoScrollInterval = setInterval(() => {
        this._moveForward();
    }, 5000);
  }

  _moveForward() {
    if (this._currentState === 'active-slide') {
      this._centerControl.classList.add('progress-fill');
      this._activeControl.classList.add('progress-fill');
      this._activeControl.classList.add('progress-reset');
      this._centerControl.classList.remove('progress-reset');
      this._activeSlide.style.order = '0';
      this._centerSlide.style.order = '1';
      this._rightSlide.style.order = '2';
      this._carouselSelector.classList.add('transition-left');
      this._currentState = 'center-slide';
    } else if (this._currentState === 'center-slide') {
      this._centerControl.classList.add('progress-reset');
      this._activeControl.classList.add('progress-reset');
      this._rightControl.classList.add('progress-fill');
      this._rightControl.classList.remove('progress-reset');
      this._activeSlide.style.order = '2';
      this._centerSlide.style.order = '0';
      this._rightSlide.style.order = '1';
      this._carouselSelector.classList.add('transition-left');
      this._currentState = 'right-slide';
    } else if (this._currentState === 'right-slide') {
      this._activeControl.classList.remove('progress-reset');
      this._centerControl.classList.add('progress-reset');
      this._rightControl.classList.add('progress-reset');
      this._activeControl.classList.add('progress-fill');
      this._activeSlide.style.order = '0';
      this._centerSlide.style.order = '1';
      this._rightSlide.style.order = '2';
      this._carouselSelector.classList.add('transition-right-double');
      this._currentState = 'active-slide';
    }
    this._buttonToRight.setAttribute('disabled', true);
  }

  _moveBack() {
    if (this._currentState === 'right-slide') {
      this._activeControl.classList.add('progress-reset');
      this._centerControl.classList.remove('progress-reset');
      this._centerControl.classList.add('progress-fill');
      this._rightControl.classList.add('progress-reset');
      this._activeSlide.style.order = '2';
      this._centerSlide.style.order = '0';
      this._rightSlide.style.order = '1';
      this._carouselSelector.classList.add('transition-right');
      this._currentState = 'center-slide';
    } else if (this._currentState === 'center-slide') {
      this._centerControl.classList.add('progress-reset');
      this._activeControl.classList.remove('progress-reset');
      this._activeControl.classList.add('progress-fill');
      this._rightControl.classList.remove('progress-fill');
      this._rightControl.classList.remove('progress-reset');
      this._activeSlide.style.order = '0';
      this._centerSlide.style.order = '1';
      this._rightSlide.style.order = '2';
      this._carouselSelector.classList.add('transition-right');
      this._currentState = 'active-slide';
    } else if (this._currentState === 'active-slide') {
      this._activeControl.classList.add('progress-reset');
      this._rightControl.classList.add('progress-fill');
      this._rightControl.classList.remove('progress-reset');
      this._activeSlide.style.order = '0';
      this._centerSlide.style.order = '1';
      this._rightSlide.style.order = '2';
      this._carouselSelector.classList.add('transition-left-double');
      this._currentState = 'right-slide';
    }
    this._buttonToLeft.setAttribute('disabled', true);
  }

  _allowMoving() {
    this._carouselSelector.classList.remove('transition-right');
    this._carouselSelector.classList.remove('transition-left');
    this._buttonToRight.removeAttribute('disabled', false);
    this._buttonToLeft.removeAttribute('disabled', false);
  }

  _setEventListeners() {
    // this._buttonToRight.addEventListener('click', this._moveForward);
    // this._buttonToLeft.addEventListener('click', this._moveBack);
    this._carouselSelector.addEventListener('animationend', () => {
      if (this._currentState === 'center-slide') {
        this._carouselSelector.classList.remove('transition-left');
        this._activeSlide.style.order = '1';
        this._centerSlide.style.order = '0';
        this._rightSlide.style.order = '2';
      } else if (this._currentState === 'right-slide') {
        this._carouselSelector.classList.remove('transition-left');
        this._carouselSelector.classList.remove('transition-left-double');
        this._activeSlide.style.order = '2';
        this._centerSlide.style.order = '1';
        this._rightSlide.style.order = '0';
      } else if (this._currentState === 'active-slide') {
        this._carouselSelector.classList.remove('transition-right');
        this._carouselSelector.classList.remove('transition-right-double');
        this._activeSlide.style.order = '0';
        this._centerSlide.style.order = '1';
        this._rightSlide.style.order = '2';
      }
      this._allowMoving();
    });

    this._startAutoScroll();
  }
}

