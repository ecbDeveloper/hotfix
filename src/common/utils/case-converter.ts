import { camelCase, snakeCase, isObject, mapKeys, mapValues } from 'lodash';

export function toCamelCase(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map((value) => toCamelCase(value));
  }

  if (isObject(obj) && obj !== null) {
    const camelCasedObject = mapKeys(obj, (_value, key) => camelCase(key));

    return mapValues(camelCasedObject, (value) => toCamelCase(value));
  }

  return obj;
}

export function toSnakeCase(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map((value) => toSnakeCase(value));
  }

  if (isObject(obj) && obj !== null) {
    const snakeCasedObject = mapKeys(obj, (_value, key) => snakeCase(key));

    return mapValues(snakeCasedObject, (value) => toSnakeCase(value));
  }

  return obj;
}
