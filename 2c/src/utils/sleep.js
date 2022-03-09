export const sleep = (time, value) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value);
    }, time)
  })
}