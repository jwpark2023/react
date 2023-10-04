export const arrayToTree = (arr, parent, addLeaf = true) => {
  return arr
    .filter(
      (item) =>
        item.P_CODE_CD === parent &&
        (addLeaf ? true : arr.find((temp) => temp.P_CODE_CD === item.CODE_CD))
    )
    .map((child) => ({
      ...child,
      title: child.CODE_NM,
      value: child.CODE_NM,
      key: child.CODE_CD,
      children: arrayToTree(arr, child.CODE_CD, addLeaf),
    }));
};
