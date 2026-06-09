const supportTicketRepository = require('../repositories/supportTicketRepository');
const ErrorHandler = require('../utils/errorHandler');

class SupportTicketService {
  async getUserTickets(userId) {
    return await supportTicketRepository.findByUser(userId);
  }

  async getTicketDetails(id, userId) {
    const ticket = await supportTicketRepository.findById(id);
    if (!ticket) throw new ErrorHandler('Ticket not found', 404);
    if (ticket.user.toString() !== userId.toString()) {
      throw new ErrorHandler('Not authorized to view this ticket', 403);
    }
    return ticket;
  }

  async createTicket(userId, ticketData) {
    const { orderId, subject, message } = ticketData;
    return await supportTicketRepository.create({
      user: userId,
      order: orderId,
      subject,
      messages: [{ sender: userId, message }],
    });
  }

  async replyToTicket(id, userId, message) {
    const ticket = await this.getTicketDetails(id, userId);
    if (ticket.status === 'closed') {
      throw new ErrorHandler('Cannot reply to a closed ticket', 400);
    }
    return await supportTicketRepository.addMessage(id, { sender: userId, message });
  }
}

module.exports = new SupportTicketService();
