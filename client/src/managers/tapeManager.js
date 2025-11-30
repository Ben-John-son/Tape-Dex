const url = "/api/tape";

export const getTapes = () => {
  return fetch(url).then((res) => res.json());
};
