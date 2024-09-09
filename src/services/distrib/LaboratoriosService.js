import axios from "axios";
import ApiException from "@/services/ApiException";

const urlBase = "https://apidistrib.pontualmedicamentos.com.br:7201";

const urls = {
  obter: `${urlBase}/Estoque/Laboratorios`,
  adicionar: `${urlBase}/Estoque/Laboratorios`,
  alterar: `${urlBase}/Estoque/Laboratorios`,
  excluir: `${urlBase}/Estoque/Laboratorios`,
};

function getToken() {
  var x = localStorage.getItem("user");

  if (x != null) {
    var user = JSON.parse(x);

    if (user && user.accessToken) {
      return `Bearer  ${user.accessToken}`;
    } else {
      return "";
    }
  } else return "";
}

export const pesquisar = (params) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization = getToken();

    axios
      .get(urls.obter, {params})
      .then((r) => {
        return resolve(r.data);
      })
      .catch((error) => {
        return reject(new ApiException(error));
      });
  });
};

export const adicionar = (model) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization = getToken();
    axios
      .post(urls.adicionar, model)
      .then((r) => {
        return resolve(r.data);
      })
      .catch((error) => {
        return reject(new ApiException(error));
      });
  });
};

export const alterar = async (model) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization = getToken();

    axios
      .put(urls.alterar, model)
      .then((r) => {
        return resolve(r.data);
      })
      .catch((error) => {
        return reject(new ApiException(error));
      });
  });
};

export const excluir = async (id) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization = getToken();

    axios
      .delete(urls.excluir + `/${id}`)
      .then((r) => {
        return resolve(r.data);
      })
      .catch((error) => {
        return reject(new ApiException(error));
      });
  });
};
