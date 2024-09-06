import axios from "axios";
import ApiException from "@/services/ApiException";

const urlBase = import.meta.env.VITE_URL_API_DISTRIB;

const urls = {
  obter: `${urlBase}/Comercial/LideradosUsuarios`,
  obterPorId: `${urlBase}/Comercial/LideradosUsuarios`,
  adicionar: `${urlBase}/Comercial/LideradosUsuarios`,
  alterar: `${urlBase}/Comercial/LideradosUsuarios`,
  excluir: `${urlBase}/Comercial/LideradosUsuarios`,
};

function getToken(): string {
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

export interface ILideradosUsuarioObter {
  id?: number | null;
  usuarioLiderId?: number | null;
  usuarioLiderNome?: string | null;
  usuarioLideradoId?: number | null;
  usuarioLideradoNome?: string | null;
  equipeId?: number | null;
  canalPadraoId?: number | null;
  tamanhoPagina?: number | null;
  paginaAtual?: number | null;

}

export interface IRetornoLideradosUsuarioDTO {
  dados: ILideradoUsuarioDto[];
  totalRegistros: number;
}

export interface ILideradoUsuarioDto {
  id: number;
  usuarioLiderId: number | null;
  usuarioLiderNome: string | null;
  usuarioLiderEmail: string | null;
  usuarioLideradoId?: number | null;
  usuarioLideradoNome?: string | null;
  usuarioLideradoEmail?: string | null;
  equipeId?: number | null;
  canalPadraoId?: number | null;
  canalPadraoDescricao?: string | null;
}

export interface IUsuarioLideradoDto {
  id: number;
  usuarioLiderId: number;
  usuarioLideradoId: number;
}

export const obter = (params: ILideradosUsuarioObter): Promise<IRetornoLideradosUsuarioDTO> => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization = getToken();

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

export const obterPorId = (id: number): Promise<IUsuarioLideradoDto> => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization = getToken();

    var params = { id: id };

    axios
      .get(urls.obterPorId, { params })
      .then((r) => {
        return resolve(r.data);
      })
      .catch((error) => {
        return reject(new ApiException(error));
      });
  });
};

export const adicionar = (
  params: Omit<IUsuarioLideradoDto, "id">
): Promise<IUsuarioLideradoDto> => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization = getToken();

    axios
      .post(urls.adicionar, params)
      .then((r) => {
        return resolve(r.data);
      })
      .catch((error) => {
        return reject(new ApiException(error));
      });
  });
};

export const alterar = async (
  id: number,
  params: IUsuarioLideradoDto
): Promise<IUsuarioLideradoDto> => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common.Authorization = getToken();

    axios
      .put(urls.alterar, params)
      .then((r) => {
        return resolve(r.data);
      })
      .catch((error) => {
        return reject(new ApiException(error));
      });
  });
};

export const excluir = async (id: number): Promise<undefined> => {
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
