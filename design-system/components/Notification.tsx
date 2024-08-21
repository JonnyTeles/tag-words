import { notification as BaseNotification } from 'antd';

const Notification = {
  success: (message: string, description?: string) => {
    BaseNotification.success({
      message,
      description,
    });
  },
  error: (message: string, description?: string) => {
    BaseNotification.error({
      message,
      description,
    });
  },
  info: (message: string, description?: string) => {
    BaseNotification.info({
      message,
      description,
    });
  },
  warning: (message: string, description?: string) => {
    BaseNotification.warning({
      message,
      description,
    });
  },
};

export default Notification;
