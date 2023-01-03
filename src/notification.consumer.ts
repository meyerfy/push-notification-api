import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConsumerService } from "./kafka/consumer.service";

@Injectable()
export class NotificationConsumer implements OnModuleInit {
  constructor(private readonly consumerService: ConsumerService) { }

  async onModuleInit() {
    await this.consumerService.consume({
      topic: { topic: 'notification' },
      config: { groupId: 'notification-consumer', allowAutoTopicCreation: true },
      onMessage: async (message) => {
        console.log(message.value.toString())
      }
    })
  }
}
