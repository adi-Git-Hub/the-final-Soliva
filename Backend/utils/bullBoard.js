const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const { queues } = require('../queues/queueManager');

/**
 * Configure Bull Board Dashboard
 */
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/api/v1/admin/queues');

createBullBoard({
  queues: queues.map((q) => new BullMQAdapter(q)),
  serverAdapter: serverAdapter,
});

module.exports = serverAdapter;