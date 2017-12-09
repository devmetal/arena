const Queue = require('./queueType');

const RootQuery = `
  type RootQuery {
    queues: [Queue]
    queue(name: String!, hostId: String!): Queue
  }
`;

module.exports.typedef = () => [RootQuery, Queue.typedef];

module.exports.resolvers = {
  async queues(parent, args, { request }) {
    const { Queues } = request.app.locals;
    const queuesList = Queues.list();

    return Promise.all(queuesList.map((q) => {
      const { name, hostId } = q;
      return Promise.all([q, Queues.get(name, hostId)]);
    }))
      .then((queues) => {
        return queues.map(([queueDatas, queue]) => ({
          ...queueDatas,
          queue,
        }));
      });
  },
  async queue(parent, args, req) {
    const { name, hostId } = args;
    const { Queues } = req.app.locals;
    const queue = await Queues.get(name, hostId);

    if (!queue) {
      return null;
    }

    return {
      name,
      hostId,
      queue,
    };
  },
}
