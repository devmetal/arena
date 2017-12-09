const Job = require('./jobType');

const RootMutation = `
  type RootMutation {
    addJob(
      queueName: String!,
      hostId: String!,
      data: Json
    ): Job
  }
`;

module.exports.typedef = () => [RootMutation, Job.typedef];

module.exports.resolvers = {
  async addJob(parent, args, { request }) {
    const { queueName, hostId, data } = args;
    const { Queues } = request.app.locals;
    const queue = await Queues.get(queueName, hostId);

    return queue.add(data);
  },
};
