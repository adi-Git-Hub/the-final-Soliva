const SupportTicket = require('../models/supportTicketModel');

class SupportTicketRepository {
  async findByUser(userId) {
    return await SupportTicket.find({ user: userId }).sort({ updatedAt: -1 });
  }

  async findById(id) {
    return await SupportTicket.findById(id).populate('order');
  }

  async create(ticketData) {
    return await SupportTicket.create(ticketData);
  }

  async addMessage(id, messageData) {
    return await SupportTicket.findByIdAndUpdate(
      id,
      { 
        $push: { messages: messageData },
        $set: { updatedAt: Date.now() }
      },
      { new: true }
    );
  }

  async updateStatus(id, status) {
    return await SupportTicket.findByIdAndUpdate(
      id,
      { $set: { status, updatedAt: Date.now() } },
      { new: true }
    );
  }
}

module.exports = new SupportTicketRepository();
