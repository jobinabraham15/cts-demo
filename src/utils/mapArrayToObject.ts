export const mapArrayToObject = (arr: Array<any>, key: string|number) => {
    return arr.reduce(
        (map, obj) => {
          map[obj[key]] = obj;
          return map;
        }, 
        {});
};