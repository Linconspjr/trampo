import axios from "axios";
import ApiException from "@/services/ApiException";

// const urlBase = "https://apidistrib.pontualmedicamentos.com.br:7201";

const urlBase = "http://192.168.10.152:3000";

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

 


export const pesquisar = (params = {Descricao, ativo, id}) => {
  return new Promise((resolve, reject) => {


   

    // if ( laboratorioId != undefined && laboratorioId != null && laboratorioId != "")
    //   params.laboratorioId = laboratorioId

    // if (Descricao != undefined && Descricao != null && Descricao != "")
    //   params.Descricao = Descricao;

    // if (ativo != undefined && ativo != null)
    //   params.ativo = ativo;

    axios
    .get(urls.obter, { params })
      .then((r) => {
        return resolve(r.data);
      })
      .catch((error) => {
        return reject(new ApiException(error));
      });
  });
};

export const pesquisarPorId = (params={id}) => {
  return new Promise((resolve, reject) => {

    axios
    .get(urls.obter+`/${params.id}`)
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

    axios
      .put(urls.alterar + `/${model.id}`, model)
      .then((r) => {
        return resolve(r.data);
      })
      .catch((error) => {
        return reject(new ApiException(error));
      });
  });
};

export const excluir = async (id) => {
  return new Promise(( resolve, reject) => {

    axios
      .delete(urls.excluir + `/${id}`)
      .then((r) => {
        return resolve(r.data);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
