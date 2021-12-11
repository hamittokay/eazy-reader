class EazyReader {
  constructor(options) {
    this.options = options || {};
    this.topCloak = null;
    this.bottomCloak = null;
    this.floatingButton = null;

    this.defaultLensHeight = 150;
    this.showCloaks = this.options.initOnLoad || false;

    this.lensHeight = this.options.lensHeight
      ? this.options.lensHeight < 30
        ? 30
        : this.options.lensHeight
      : this.defaultLensHeight;

    this.mountElements();
    this.initListeners();
    this.injectStyles();
    this.customizeWidget();
  }

  mountElements() {
    this.topCloak = document.createElement("div");
    this.topCloak.classList.add("er-cloak", "er--top-cloak");

    this.bottomCloak = document.createElement("div");
    this.bottomCloak.classList.add("er-cloak", "er--bottom-cloak");

    this.floatingButton = document.createElement("span");
    this.floatingButton.classList.add("er-floating-button");
    this.floatingButton.innerHTML =
      '<svg width="25" height="11" viewBox="0 0 25 11" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M19.5313 0C17.1625 0 15.1514 1.51772 14.3913 3.63657C13.8304 3.32285 13.186 3.14286 12.5 3.14286C11.814 3.14286 11.1697 3.32285 10.6088 3.63657C9.84867 1.51772 7.83756 0 5.46876 0C2.44838 0 0 2.46237 0 5.5C0 8.53763 2.44838 11 5.46876 11C8.48913 11 10.9375 8.53763 10.9375 5.5C10.9375 5.4419 10.9305 5.38534 10.9288 5.32747C11.3449 4.94777 11.8953 4.71427 12.5 4.71427C13.1047 4.71427 13.6551 4.94776 14.0712 5.32747C14.0695 5.38534 14.0625 5.44191 14.0625 5.5C14.0625 8.53763 16.5109 11 19.5312 11C22.5516 11 25 8.53763 25 5.5C25 2.46237 22.5516 0 19.5312 0H19.5313ZM5.46876 9.42857C3.31462 9.42857 1.5625 7.66644 1.5625 5.5C1.5625 3.33356 3.31462 1.57143 5.46876 1.57143C7.62289 1.57143 9.37501 3.33356 9.37501 5.5C9.37501 7.66644 7.62289 9.42857 5.46876 9.42857ZM19.5313 9.42857C17.3771 9.42857 15.625 7.66644 15.625 5.5C15.625 3.33356 17.3771 1.57143 19.5313 1.57143C21.6854 1.57143 23.4375 3.33356 23.4375 5.5C23.4375 7.66644 21.6854 9.42857 19.5313 9.42857Z" fill="white"/> </svg>';

    document.body.appendChild(this.topCloak);
    document.body.appendChild(this.bottomCloak);
    document.body.appendChild(this.floatingButton);
  }

  initListeners() {
    const onMouseUpdate = ({ y }) => {
      if (!this.showCloaks) {
        return;
      }

      this.topCloak.style.height = `${y - this.lensHeight / 2}px`;
      this.bottomCloak.style.height = `${
        window.innerHeight - this.lensHeight / 2 - y
      }px`;
    };

    document.addEventListener("mousemove", onMouseUpdate, false);
    document.addEventListener("mouseenter", onMouseUpdate, false);
    document.addEventListener("keydown", (event) => {
      if (event.code === "Escape") {
        this.toggleCloaks(false);
      }

      if (event.code === "KeyR") {
        this.toggleCloaks(true);
      }
    });
    document.addEventListener("blur", () => {
      this.toggleCloaks(false);
    });

    this.floatingButton.addEventListener("click", () => {
      this.toggleCloaks(true);
    });
  }

  updateCloakStyles(field, value) {
    [this.topCloak, this.bottomCloak].forEach(
      (item) => (item.style[field] = value)
    );
  }

  customizeWidget() {
    if (this.options.blur) {
      this.updateCloakStyles(
        "backdrop-filter",
        `blur(${this.options.blurIntensity || 2}px)`
      );
    }

    if (this.options.lensOpacity) {
      this.updateCloakStyles(
        "background",
        `rgba(0,0,0,${this.options.lensOpacity || 0.8})`
      );
    }
  }

  injectStyles() {
    const styles = `
      .er-cloak {
        position: fixed;
        left: 0;
        right: 0;
        width: 100%;
        z-index: 2000;
        background: rgba(0,0,0,.8);
      }
      
      .er--top-cloak {
        top: 0;
      }
      
      .er--bottom-cloak {
        bottom: 0;
      }

      .er-floating-button {
        position: fixed;
        width: 50px;
        height: 50px;
        background: #0f172a;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        bottom: 30px;
        right: 30px;
        border-radius: 50%;
        transition: all 300ms
      }

      .er-floating-button:hover {
        background: #313f60
      }
    `;

    const stylesheet = document.createElement("style");
    stylesheet.innerHTML = styles;
    document.head.appendChild(stylesheet);
  }

  toggleCloaks(condition = true) {
    this.showCloaks = !!condition;
    this.updateCloakStyles("display", condition ? "block" : "none");
  }
}
