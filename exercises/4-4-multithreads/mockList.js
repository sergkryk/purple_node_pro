export default function renderMockList() {
  const list = [];

  for (let i = 0; i < 3000000; i++) {
    const random = Math.floor(Math.random()*100);
    list.push(random);
  };

  return list;
}

