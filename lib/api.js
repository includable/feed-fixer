export const getItem = async (id) => {
    const result = await fetch(`https://schof.link/${id}`);
    const item = await result.json();
  
    return item;
  };

export const saveItem = async (item, id = undefined) => {
  const result = await fetch(
    `https://schof.link/api/get-url?${new URLSearchParams({
      filename: "item.json",
      contentType: "application/json",
      editable: "true",
      unique: new Date().valueOf(),
      id,
    })}`
  );
  const { key, url } = await result.json();

  await fetch(url, {
    method: "PUT",
    body: JSON.stringify({
      ...item,
      id: key,
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }),
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `inline; filename="item.json"`,
    },
  });

  return key;
};
