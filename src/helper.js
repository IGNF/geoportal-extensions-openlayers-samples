import DataObjectParser from "dataobject-parser";

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}
  
  /**
   * Deep merge two objects.
   * @param target
   * @param ...sources
   */
export function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();
  
    if (isObject(target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
  
    return mergeDeep(target, ...sources);
}

/**
 * Conversion des options
 * @param opts
 */
 export function setOptions(opts) {
    var obj = {
        name : opts.name,
        options : {}
    };
    opts.params.forEach(element => {
        if ("value" in element && element.value !== null) {
            var d = new DataObjectParser();
            d.set(element.name, element.value);
            var o = d.data();
            mergeDeep(obj, o);
        }
    });
    return obj.options;
}