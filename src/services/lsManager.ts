import cryptojs from "crypto-js";

export class LSManager {
  static lsKey: string = "Yq3s6v9y$B&E)H@McQfTjWnZr4u7w!z%gVkYp3s5v8y/B?E(H+MbQeThWmZq4t7wNdRgUkXp2r5u8x/A?D(G+KbPeShVmYq3)J@NcRfUjXn2r4u7x!A%D*G-KaPdSgVkB&E)H@McQfTjWnZr4t7w!z%C*F-JaNdR";

  static setLS(key: string, value: string) {
    const encValue = cryptojs.AES.encrypt(value, this.lsKey).toString();
    localStorage.setItem(key, encValue);
  }

  static removeLS(key: string) {
    localStorage.removeItem(key);
  }

  static getLS(key: string) {
    const encValue = localStorage.getItem(key) || "";
    const decValue = cryptojs.AES.decrypt(encValue, this.lsKey);
    var originalText = decValue.toString(cryptojs.enc.Utf8);
    return originalText;
  }
}
