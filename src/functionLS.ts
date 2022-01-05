export const parseLS = (login: string) => {
  const data = localStorage.getItem(`${login}`);
  if (data !== null) {
    return JSON.parse(data);
  }
  return {
    password: "",
    favorites: [],
  };
};

export const addFavoriteLS = (id: number, title: string) => {
  const account = localStorage.getItem("account");
  if (account !== null) {
    const obj = {
      password: parseLS(account).password,
      favorites: [...parseLS(account).favorites],
    };
    obj.favorites.push({ id, title });
    localStorage.setItem(`${account}`, JSON.stringify(obj));
    return obj.favorites;
  }
  return [];
};

export const getFavoriteLS = () => {
  const account = localStorage.getItem("account");
  if (account !== null && account !== "") {
    return parseLS(account).favorites;
  }
  return [];
};

export const delFavoriteLS = (id: number) => {
  const account = localStorage.getItem("account");
  const accountName = account !== null ? account : "";
  const obj = {
    password: parseLS(accountName).password,
    favorites: [...parseLS(accountName).favorites],
  };
  const delItem = obj.favorites.filter((el) => el.id !== id);
  obj.favorites = delItem;
  localStorage.setItem(`${accountName}`, JSON.stringify(obj));
  return parseLS(accountName).favorites;
};
