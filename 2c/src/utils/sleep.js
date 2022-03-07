export const sleep = (time, hasMore) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(hasMore);
    }, time)
  })
}