'use strict';

export default function map(obj, cb) {
  return Object.keys(obj).map((key) => cb(obj[key], key, obj));
}
