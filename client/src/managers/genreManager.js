const url = "/api/Genre";


const getGenres = () => {
  return fetch(url).then((res) => res.json());
}

export default getGenres;
