import { notification as BaseNotification, NotificationArgsProps } from 'antd';

const Notification = {
  success: (props: NotificationArgsProps) => {
    BaseNotification.success({
      ...props
    });
  },
  error: (props: NotificationArgsProps) => {
    BaseNotification.error({
      ...props
    });
  },
  info: (props: NotificationArgsProps) => {
    BaseNotification.info({
      ...props
    });
  },
  warning: (props: NotificationArgsProps) => {
    BaseNotification.warning({
      ...props
    });
  },
};

export default Notification;
