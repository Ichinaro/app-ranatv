const BASE_URL = "http://localhost:3001";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const randomNumber = (min = 0, max = 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const simulateNetworkLatency = (min = 30, max = 1500) =>
  delay(randomNumber(min, max));

async function callApi(endpoint, options = {}) {
  await simulateNetworkLatency();

  options.headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const url = BASE_URL + endpoint;
  const response = await fetch(url, options);
  const data = await response.json();

  return data;
}

const api = {
  noticias: {
    list() {
      //return [];
      //throw new Error("No found");
      return callApi("/noticias");
    },
    create(noticia) {
      //throw new Error("500: Server error");
      return callApi(`/noticias`, {
        method: "POST",
        body: JSON.stringify(noticia),
      });
    },
    read(noticiaId) {
      return callApi(`/noticias/${noticiaId}`);
    },
    update(noticiaId, updates) {
      return callApi(`/noticias/${noticiaId}`, {
        method: "PUT",
        body: JSON.stringify(updates),
      });
    },
    // Lo hubiera llamado `delete`, pero `delete` es un keyword en JavaScript asi que no es buena idea :P
    remove(noticiaId) {
      return callApi(`/noticias/${noticiaId}`, {
        method: "DELETE",
      });
    },
  },
};

export default api;
