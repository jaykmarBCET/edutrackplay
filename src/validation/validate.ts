import { z } from "zod";

export const collegeValidate = z.object({
  name: z.string().min(4).max(50).trim().nonempty(),
  title: z.string().trim().min(10).max(100).nonempty(),
  email: z.string().email().nonempty(),

  phone: z.string().min(10).max(13),

  description: z.string().min(30).max(1000),

  logo: z
    .string()
    .url()
    .nonempty()
    .refine((val) => {
      try {
        const host = new URL(val).hostname;
        return host === "cloudinary.com" || host.endsWith(".cloudinary.com");
      } catch {
        return false;
      }
    }, { message: "Logo URL must be hosted on cloudinary.com" }),

  owner_phone: z.number().min(1000000000).max(100000000000),

  owner_email: z.string().email().nonempty(),

  owner_name: z.string().min(5).max(50).nonempty(),
  address:z.string().trim().min(16).max(50),
  field:z.string().trim().min(3).max(30),
  password:z.string().trim().min(6).max(16)

});


export const parentValidate= z.object({
  name:z.string().min(3).max(50).trim().nonempty(),
  address:z.string().min(16).max(72).trim().nonempty(),
  gender:z.string(),
  email:z.string().email(),
  phone:z.number().min(1000000000).max(100000000000),
  age:z.number().min(25).max(85),
  password:z.string().min(6).max(16),

})
export const studentValidate=z.object({
  name:z.string().min(3).max(50).trim().nonempty(),
  address:z.string().min(16).max(72).trim().nonempty(),
  gender:z.string(),
  email:z.string().email(),
  phone:z.number().min(1000000000).max(10000000000),
  age:z.number().min(4).max(22),
  password:z.string().min(6).max(16)
})

export const loginValidate = z.object({
  password:z.string().min(6).max(16),
  email:z.string().email()
})
export class Validate {
  private _data: unknown;
  private _isValid: boolean = true;

  constructor() {}

  getData() {
    return this._data;
  }

  isValid(): boolean {
    return this._isValid;
  }

  setData(data: unknown) {
    this._data = data;
    this._isValid = true;
    return this;
  }

  minLength(minLen: number) {
    if (this._isValid && typeof this._data === 'string') {
      if (this._data.length < minLen) this._isValid = false;
    }
    return this;
  }

  maxLength(maxLen: number) {
    if (this._isValid && typeof this._data === 'string') {
      if (this._data.length > maxLen) this._isValid = false;
    }
    return this;
  }

  minDigit(digit: number) {
    if (this._isValid && typeof this._data === 'number') {
      if (this._data.toString().length < digit) this._isValid = false;
    }
    return this;
  }

  maxDigit(digit: number) {
    if (this._isValid && typeof this._data === 'number') {
      if (this._data.toString().length > digit) this._isValid = false;
    }
    return this;
  }

  minValue(value: number) {
    if (this._isValid && typeof this._data === 'number') {
      if (this._data < value) this._isValid = false;
    }
    return this;
  }

  maxValue(value: number) {
    if (this._isValid && typeof this._data === 'number') {
      if (this._data > value) this._isValid = false;
    }
    return this;
  }

  isString() {
    if (this._isValid && typeof this._data !== 'string') {
      this._isValid = false;
    }
    return this;
  }

  isNumber() {
    if (this._isValid && typeof this._data !== 'number') {
      this._isValid = false;
    }
    return this;
  }

  isEmail() {
    if (this._isValid && typeof this._data === 'string') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this._data)) this._isValid = false;
    } else {
      this._isValid = false;
    }
    return this;
  }
}

export const ValidateData = new Validate()
