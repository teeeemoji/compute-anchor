function mockData(prefix) {
  const ListSize = 20;
  return new Array(ListSize).fill(1).map((i, index) => ({
    anchor: `${prefix}-${index + 1}`,
    height: Math.max((ListSize - index) * 30, 50)
  }));
}

export default mockData;
