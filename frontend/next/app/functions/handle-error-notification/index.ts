import Notification from "design-system/components/Notification";

/**
 * Lida com a notificação de erro.
 * 
 * @param {any} error - O erro que precisa ser notificado.
 * @param {string} defaultMessage - Mensagem padrão a ser exibida na notificação.
 */
export const handleErrorNotification = (error: any, defaultMessage: string) => {
  console.error('Erro no handleErrorNotification:', error);
  const errorMessage = typeof error === 'object' && error.message ? error.message : error;
  console.error(errorMessage);
  Notification.error({ message: defaultMessage, description: errorMessage, duration: 5, showProgress: true });
};