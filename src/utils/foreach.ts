export const forEach = async (array: any, callback: Function) => {
  // Rewriting the forEach loop
  for (let index = 0; index < array.length; index += 1) {
    // eslint-disable-next-line no-await-in-loop
    await callback(array[index], index, array);
  }
};
