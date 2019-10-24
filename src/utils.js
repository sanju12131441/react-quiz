export function isObject(object) {
  return typeof object === 'object';
}

export function isDefined(object) {
  return typeof object !== 'undefined' && object !== null;
}

export function Optional(value) {
  return {
    or: orValue => isDefined(value) ? value : orValue,
    isPresent: () => isDefined(value),
    get: () => value
  };
}