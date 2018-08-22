abstract class Subscribe {
  subIds: number;
  subscriptions: any;
}

class PubSub extends Subscribe {
  constructor() {
    super();
    this.subIds = 0;
    this.subscriptions = {};
  }

  subscribe(topic: string, fn: Function) {
    if (!this.subscriptions[topic]) {
      this.subscriptions[topic] = {};
    }
    const token = ++this.subIds;
    // Validate topic name and function constructor
    this.subscriptions[topic][token] = fn;
    console.log("this.subscriptions", this.subscriptions);
    return () => this.unsubscribe(topic, token);
  }

  publish(topic: string, ...args: Array<any>) {
    const subs = this.subscriptions[topic];
    if (!subs) {
      return false;
    }
    Object.keys(subs)
      .map(k => subs[k])
      .forEach(sub => sub(...args));
    return;
    // Object.values(subs).forEach(sub => sub(...args));
  }

  unsubscribe(topic: string, token?: any) {
    if (!token) {
      delete this.subscriptions[topic];
    } // Delete all subscriptions for the topic
    if (this.subscriptions[topic]) {
      delete this.subscriptions[topic][token];
    } // Delete specific subscription
  }
}
const pubsub = new PubSub();
export default pubsub;
