var ObjProto, addComponent, compositeRegex, dot, extend, getComponent, getKeys, hasType, identity, isArray, isAtomicKeypath, isObject, isString, keypathRegex, processKeypath, shallowCopy, toString, transformResult, _ref,
  __slice = [].slice,
  __hasProp = {}.hasOwnProperty;

dot = '.';

ObjProto = Object.prototype;

compositeRegex = /\.[^\.]*\./;

keypathRegex = /\.([^\.]*)(\.?.*)$/;

addComponent = function(keypath, newComponent, recipient) {
  var i, key, keys, last, proxy, _i;
  keys = getKeys(keypath);
  last = keys.length - 1;
  proxy = recipient;
  for (i = _i = 0; 0 <= last ? _i < last : _i > last; i = 0 <= last ? ++_i : --_i) {
    key = keys[i];
    if (proxy[key] == null) {
      proxy[key] = {};
    }
    proxy = proxy[key];
  }
  return proxy[keys[last]] = newComponent;
};

extend = function() {
  var key, mixin, mixins, obj, val, _i, _len;
  obj = arguments[0], mixins = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  for (_i = 0, _len = mixins.length; _i < _len; _i++) {
    mixin = mixins[_i];
    for (key in mixin) {
      if (!__hasProp.call(mixin, key)) continue;
      val = mixin[key];
      obj[key] = val;
    }
  }
  return obj;
};

getComponent = function(keypath, obj) {
  var key, nextKey, nextKeypath, _ref;
  if (isAtomicKeypath(keypath)) {
    key = keypath.slice(1);
    return shallowCopy(obj[key]);
  } else {
    _ref = processKeypath(keypath), nextKey = _ref[0], nextKeypath = _ref[1];
    if (!isObject(obj[nextKey])) {
      return null;
    }
    return getComponent(nextKeypath, obj[nextKey]);
  }
};

getKeys = function(keypath) {
  return keypath.split(dot).slice(1);
};

identity = function(val) {
  return val;
};

isArray = Array.isArray;

isAtomicKeypath = function(keypath) {
  return !(compositeRegex.test(keypath));
};

hasType = function(type) {
  return function(val) {
    return ("[object " + type + "]") === toString(val);
  };
};

_ref = ['Object', 'String'].map(hasType), isObject = _ref[0], isString = _ref[1];

processKeypath = function(keypath) {
  return keypathRegex.exec(keypath).slice(1, 3);
};

shallowCopy = function(val) {
  var copy, key, prop;
  switch (false) {
    case !isObject(val):
      copy = {};
      for (key in val) {
        if (!__hasProp.call(val, key)) continue;
        prop = val[key];
        copy[key] = prop;
      }
      return copy;
    case !isArray(val):
      return val.map(identity);
    default:
      return val;
  }
};

toString = function(val) {
  return ObjProto.toString.call(val);
};

transformResult = function(result, fn) {
  return result = fn(result);
};

module.exports = {
  addComponent: addComponent,
  extend: extend,
  getComponent: getComponent,
  isArray: isArray,
  isObject: isObject,
  isString: isString
};
