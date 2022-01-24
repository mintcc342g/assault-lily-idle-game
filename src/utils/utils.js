export function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function msToMin(ms) {
  return ms * 60000
}
