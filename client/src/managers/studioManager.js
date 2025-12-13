const url = "/api/studio";

export const getStudios = () => {
  return fetch(url).then((res) => res.json());
};

export const getStudiosByUser = (id) => {
  return fetch(`${url}/studioBy/${id}`).then((res) => res.json());
};

export const newStudio = (studio) => {
  return fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(studio),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to create studio");
    }
    return res.json();
  });
};

export const getStudioById = (id) => {
  return fetch(`${url}/${id}`).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch studio");
    return res.json();
  });
};

export const updateStudio = (id, studio) => {
  return fetch(`${url}/${id}`, {
    method: "PATCH",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(studio),
  }).then(async (res) => {
    if (!res.ok) throw new Error("Failed to update studio");
    if (res.status === 204) return null; 
    return res.json();
  });
};

export const deleteStudio = (id) => {
  return fetch(`${url}/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to delete tape");
    return null;
  });
};
