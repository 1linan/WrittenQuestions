export function cloneUserList(data: any) {
  const res = [];
  for (let i = 0; i < data.length; i++) {
    res.push({
      ...data[i],
    });
  }
  return res;
}
