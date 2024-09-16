export default class ApiException extends Error {
  
   message = ``;

  constructor(error) {
    super();

    var message = "";
    
    if (error.response != undefined && error.response != null && error.response.data != undefined) {
      if (error.response.data.message != undefined) message = error.response?.data?.message;
      else {
        if (error.response.data.length > 0) {

          if (Array.isArray(error.response?.data)) {
            error.response?.data.forEach(element => {
              message += `Campo ${element.campo} : ${element.mensagem}, `;
            });
          }
          else
            message = error.response?.data;
          

        }
      }
    } else {
      if (error.message != undefined && error.message != null) message = error.message;
    }

    if (!message && error.message == "Network error") message = "Erro de rede/internet!";

    if (!message && error?.response?.status == "404") message = "Não encontrado";

    if ((!message && error?.response?.status == "401") || (!message && error?.response?.status == "405"))
      if (error?.response?.data != '')
        message = error?.response?.data;
      else
        message = "Sem permissão!";

    this.message = message;

  }
}
