export function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function msToMin(ms) {
  return ms * 60000
}

export function isEmptyObject(obj)  {
  if(obj.constructor === Object && Object.keys(obj).length === 0)  {
    return true;
  }
  
  return false;
}