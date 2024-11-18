import axios from "axios";
import { notification } from "antd";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const statusCode = error.response.status; // Acessa o status code da resposta de erro
      const errorMessage = error.response.data?.message || "Erro na requisição";

      if (statusCode === 403) {
        notification.error({
          message: "Erro de Autorização",
          description: errorMessage,
        });
      } else {
        notification.error({
          message: `Erro HTTP ${statusCode}`,
          description: errorMessage,
        });
      }
    } else if (error.request) {
      // O pedido foi feito, mas não houve nenhuma resposta
      notification.error({
        message: "Erro de conexão",
        description: "Sem resposta do servidor",
      });
    } else {
      // Algo aconteceu antes do pedido ser feito
      notification.error({
        message: "Erro",
        description: error.message,
      });
    }
    return Promise.reject(error);
  }
);
