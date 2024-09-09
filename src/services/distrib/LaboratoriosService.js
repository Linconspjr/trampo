import axios from "axios";
import ApiException from "@/services/ApiException";

// const urlBase = "https://apidistrib.pontualmedicamentos.com.br:7201";

const urlBase = "http://localhost:3000";

const urls = {
  obter: `${urlBase}/laboratorios`,
  adicionar: `${urlBase}/laboratorios`,
  alterar: `${urlBase}/laboratorios`,
  excluir: `${urlBase}/laboratorios`,
};

 export const itens = {
    laboratorioId: Number | '',
    Descricao: String | null,
    ativo: String | null,
    OrdemExibicao: Number | null, 
    DataAlteracao: Date | null,
    id: Number | null
}

export const retorna = {
  dados: itens
}
  


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

export const pesquisar = (descricao, ativo) => {
  return new Promise((retorna) => {
    axios.defaults.headers.common.Authorization = getToken();

    var params = {};

    if (descricao != undefined && descricao != null && descricao != "")
      params.descricao_like = descricao;

    if (ativo != undefined && ativo != null)
      params.ativo = ativo;

    axios
      .get(urls.obter, { params})
      .then((r) => {
        return retorna(r.data);
      })
      .catch((error) => {
        return (new ApiException(error));
      });
  });
};

export const adicionar = (model) => {
  return new Promise(( reject) => {
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
  return new Promise(( reject) => {
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
  return new Promise(( reject) => {
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
