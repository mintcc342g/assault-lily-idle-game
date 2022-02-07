export function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function msToSec(ms) {
  return ms * 1000
}

export function minToMs(min) {
  return min * 60000
}

export function isEmptyObject(obj)  {
  if(obj.constructor === Object && Object.keys(obj).length === 0)  {
    return true;
  }
  
  return false;
}

export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}