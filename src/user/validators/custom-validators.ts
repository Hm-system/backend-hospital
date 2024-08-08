import { registerDecorator, ValidationOptions } from 'class-validator';

// Custom validators

/**The following custom validators are used to ensure that the password
 * contains at least one uppercase letter,
 *  one lowercase letter,
 *   one number,
 * and one special character.
 */

export function IsUppercase(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isUppercase',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return /[A-Z]/.test(value);
        },
        defaultMessage() {
          return 'Password must contain at least one uppercase letter';
        },
      },
    });
  };
}

export function IsLowercase(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isLowercase',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return /[a-z]/.test(value);
        },
        defaultMessage() {
          return 'Password must contain at least one lowercase letter';
        },
      },
    });
  };
}

export function IsNumber(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return /\d/.test(value);
        },
        defaultMessage() {
          return 'Password must contain at least one number';
        },
      },
    });
  };
}

export function IsSpecialCharacter(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isSpecialCharacter',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return /[!@#$%^&*(),.?":{}|<>]/.test(value);
        },
        defaultMessage() {
          return 'Password must contain at least one special character';
        },
      },
    });
  };
}
