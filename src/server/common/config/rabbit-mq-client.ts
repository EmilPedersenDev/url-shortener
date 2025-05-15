import amqp, { ChannelModel, Channel } from 'amqplib';
import { RabbitMQError } from '../errors';

let connection: ChannelModel;
let channel: Channel;

export const connectRabbitMQ = async (): Promise<void> => {
  try {
    connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
    console.log('✅ RabbitMQ connected');
  } catch (error) {
    console.error('Rabbit MQ connection error: ', error);
    process.exit(1);
  }
};

export const getChannel = (): Channel => {
  if (!channel) {
    throw new RabbitMQError('RabbitMQ channel not initialized');
  }
  return channel;
};

export const assertQueue = async (queueName: string): Promise<void> => {
  try {
    await channel.assertQueue(queueName, { durable: true });
  } catch (error) {
    console.error('RabbitMQ queue creation error: ', error);
    process.exit(1);
  }
};
