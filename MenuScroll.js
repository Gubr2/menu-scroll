/////////////////////////////////////////////////
/////////////////////////////////////////////////
// *** MENU SCROLL by Adrián Gubrica, v1.4 *** //
/////////////////////////////////////////////////
/////////////////////////////////////////////////

/////////////// Variables /////////////////

// ---> selector [string] - Selector for the menu
// ---> distance [int or float] - Distance from the top, where the scroll effect start to work
// ---> movementClass [string] - Specifies the class, that is added to the selector, when scroll effect is initialized
// ---> backgroundClass [string]
// ---> customScroller[boolean] - Decides, whether the default init() function should be started or not (when having custom scroller, it is better to not start it)

/////////////// Options /////////////////

// ---> Combining with smooth scroll possible by using update([int or float]) function on smooth scroll event

export default class MenuScroll {
  constructor(_options) {
    //
    // GLOBAL
    //

    this.selector = document.querySelector(_options.selector)
    this.distance = _options.distance
    this.movementClass = _options.movementClass
    this.backgroundClass = _options.backgroundClass
    this.customScroller = _options.customScroller

    // Variables
    this.scrollValues = {
      current: 0,
      new: 0,
    }

    // Init
    if (!this.customScroller) {
      this.init()
    }
  }

  init() {
    this.update(document.documentElement.scrollTop)

    document.addEventListener('scroll', (_e) => {
      this.update(document.documentElement.scrollTop)
    })
  }

  update(_value) {
    // [1] Init on given distance
    if (_value > this.distance) {
      // [2] Get the current values & add background class
      setTimeout(() => {
        this.scrollValues.current = _value
      }, 250)
      this.scrollValues.new = _value

      if (this.backgroundClass) {
        this.selector.classList.add(this.backgroundClass)
      }

      // [3] Add Classes
      if (this.scrollValues.new > this.scrollValues.current) {
        if (this.movementClass) {
          this.selector.classList.add(this.movementClass)
        }
      } else {
        if (this.movementClass) {
          this.selector.classList.remove(this.movementClass)
        }
      }
    } else {
      // [2] Remove background class
      if (this.backgroundClass) {
        this.selector.classList.remove(this.backgroundClass)
      }
    }
  }
}
