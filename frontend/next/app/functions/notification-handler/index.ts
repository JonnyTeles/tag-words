import Notification from "design-system/components/Notification";

type NotificationType = 'error' | 'info' | 'success' | 'warning';

/**
 * Abre o componente Notification
 * 
 * @param {string} message - Oque precisa ser notificado.
 * @param {string} description - Mensagem padrão a ser exibida na notificação.
 */
export const handleNotification = (type: NotificationType, message: string, description: string) => {
    Notification[type]({ message: message, description: description, duration: 5, showProgress: true });
};