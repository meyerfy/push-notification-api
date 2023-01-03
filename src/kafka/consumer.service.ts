import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Kafka, Consumer, ConsumerRunConfig, ConsumerSubscribeTopic } from "kafkajs";
import { IConsumer } from "./consumer.interface";
import { KafkajsConsumerOptions } from "./kafkajs-consumer-options.interface";
import { KafkajsConsumer } from "./kafkajs.consumer";

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private readonly consumers: IConsumer[] = [];

  constructor(private readonly configService: ConfigService) { }

  async consume({ topic, config, onMessage }: KafkajsConsumerOptions) {
    const consumer = new KafkajsConsumer(topic, config, this.configService.get('KAFKA_BROKER'))
    await consumer.connect();
    await consumer.consume(onMessage)
    this.consumers.push(consumer)
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
