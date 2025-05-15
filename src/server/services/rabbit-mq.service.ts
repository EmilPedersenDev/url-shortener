import { QueueMessage } from '../types/rabbit-mq.types';
import { getChannel } from '../common/config/rabbit-mq-client';
import { Channel } from 'amqplib';

class RabbitMqService {
  public static RABBIT_QUEUE_NAME: string = 'generate-hashes';
  public static createHashes(): void {
    const channel: Channel = getChannel();
    const queueMsg: QueueMessage = { hashCount: 500 };
    channel.sendToQueue(this.RABBIT_QUEUE_NAME, Buffer.from(JSON.stringify(queueMsg)), {
      persistent: true,
    });
  }
}

export default RabbitMqService;
