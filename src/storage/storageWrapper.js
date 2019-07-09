class LocalStorageWrapper {
  get(key) {
    const valueString = localStorage.getItem(key);
    const value = JSON.parse(valueString);
    if (typeof value === "object") {
      //console.log("LocalStorage get:", { value });
      return value;
    }
    return valueString;
  }
  set(key, value) {
    const valueString = JSON.stringify(value);
    localStorage.setItem(key, valueString);
    //console.log("LocalStorage set:", { valueString });
  }
  clear() {
    //console.log("LocalStorage clear");
    localStorage.clear();
  }
}

const localStorageWrapper = new LocalStorageWrapper();

class ChromeStorageWrapper {
  isChromeExtension =
    window.chrome && window.chrome.storage && window.chrome.storage.sync;
  sync = this.isChromeExtension ? window.chrome.storage.sync : null;
  get(key) {
    return new Promise(resolve => {
      if (this.isChromeExtension) {
        this.sync.get([key], function(result) {
          const value = result[key];
          //console.log("Chrome storage get:", { value });
          resolve(value);
        });
      } else {
        resolve(localStorageWrapper.get(key));
      }
    });
  }

  set(key, value) {
    if (this.isChromeExtension) {
      this.sync.set({ [key]: value }, () => {
        /* console.log("Chrome storage set:", {
          [key]: value
        }); */
        /* this.sync.get([key], result => {
          console.log("Chrome storage get:", { result });
        }); */
      });
    } else {
      localStorageWrapper.set(key, value);
    }
  }
  clear() {
    if (this.isChromeExtension) {
      this.sync.clear();
    } else {
      localStorageWrapper.clear();
    }
  }
}

const chromeStorageWrapper = new ChromeStorageWrapper();

export default chromeStorageWrapper;
