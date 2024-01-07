import * as Notifications from 'expo-notifications';

export const nowNotification = async (title, body) => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: body,
        },
        trigger: null
    });
};