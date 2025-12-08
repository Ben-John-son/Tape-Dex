const url = "/api/studio"

export const getStudios = () => {
return   fetch(url).then((res) => res.json());
}
