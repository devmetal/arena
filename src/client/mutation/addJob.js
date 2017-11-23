const mutation = `
mutation AddJob($qname: String!, $hostId: String!, $data: JSON) {
  addJob(queueName: $qname, hostId:$hostId, data: $data) {
    id,
    state,
    timestamp,
    data
  }
}`;
