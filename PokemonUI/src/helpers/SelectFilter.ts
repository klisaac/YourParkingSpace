export const customSelectFilter = (option, searchText) => {
  const items: string[] = searchText.split(" ");

  let found = true;

  items.forEach((item) => {
    if (option.label.toLowerCase().includes(item.toLowerCase())) {
      found = found && true;
    } else {
      found = found && false;
    }
  });

  return found;
};
