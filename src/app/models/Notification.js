import { Schema, model } from 'mongoose';
import { Expo } from 'expo-server-sdk';

const NotificationSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    tel: {
      type: Number,
    },
  },
  { timestamps: true }
);

NotificationSchema.methods = {
  async sendNotification(push_token) {
    const expo = new Expo();

    if (Expo.isExpoPushToken(push_token)) {
      return null;
    }

    const push = {
      to: push_token,
      sound: 'default',
      body: this.description,
    };
    const chunk = expo.chunkPushNotifications(push);
    return expo.sendPushNotificationsAsync(chunk);
  },
};

export default model('Notification', NotificationSchema);
