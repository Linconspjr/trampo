export default class ApiException extends Error {
  

  constructor() { //como q arruma isso mano
    super();

    var message = "";
    
    if (Error.response != undefined && Error.response != null && Error.response.data != undefined) {
      if (Error.response.data.message != undefined) message = Error.response?.data?.message;
      else {
        if (Error.response.data.length > 0) {

          if (Array.isArray(Error.response?.data)) {
            Error.response?.data.forEach(element => {
              message += `Campo ${element.campo} : ${element.mensagem}, `;
            });
          }
          else
            message = Error.response?.data;
          

        }
      }
    } else {
      if (Error.message != undefined && Error.message != null) message = Error.message;
    }

    if (!message && Error.message == "Network Error") message = "Erro de rede/internet!";

    if (!message && Error?.response?.status == "404") message = "Não encontrado";

    if ((!message && Error?.response?.status == "401") || (!message && Error?.response?.status == "405"))
      if (Error?.response?.data != '')
        message = Error?.response?.data;
      else
        message = "Sem permissão!";

    this.message = message;

  }
}
