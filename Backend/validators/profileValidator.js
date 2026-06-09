const { z } = require('zod');

const profileValidator = {
  updateLifestyle: z.object({
    body: z.object({
      lifestyle: z.enum(['student', 'office commute', 'outdoor usage', 'travel usage', 'daily rides', 'other']),
    }),
  }),

  updatePreferences: z.object({
    body: z.object({
      preferences: z.object({
        preferredColors: z.array(z.string()).optional(),
        utilityMode: z.enum(['office commute', 'outdoor travel', 'daily rides']).optional(),
      }),
    }),
  }),

  addToWishlist: z.object({
    body: z.object({
      productId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Product ID'),
      wantsRestockAlert: z.boolean().optional(),
    }),
  }),

  removeFromWishlist: z.object({
    params: z.object({
      productId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Product ID'),
    }),
  }),

  updateNotifications: z.object({
    body: z.object({
      notifications: z.object({
        email: z.boolean().optional(),
        whatsapp: z.boolean().optional(),
        push: z.boolean().optional(),
      }),
    }),
  }),

  trackProductView: z.object({
    body: z.object({
      productId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Product ID'),
    }),
  }),

  addAddress: z.object({
    body: z.object({
      label: z.string().optional(),
      street: z.string().min(1, 'Street is required'),
      city: z.string().min(1, 'City is required'),
      state: z.string().min(1, 'State is required'),
      pincode: z.string().min(6, 'Pincode is required'),
      isDefault: z.boolean().optional(),
      coordinates: z.object({
        lat: z.number(),
        lng: z.number(),
      }).optional(),
    }),
  }),

  updateAddress: z.object({
    params: z.object({
      id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Address ID'),
    }),
    body: z.object({
      label: z.string().optional(),
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      pincode: z.string().optional(),
      isDefault: z.boolean().optional(),
      coordinates: z.object({
        lat: z.number(),
        lng: z.number(),
      }).optional(),
    }),
  }),

  deleteAddress: z.object({
    params: z.object({
      id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Address ID'),
    }),
  }),

  createSupportTicket: z.object({
    body: z.object({
      orderId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Order ID').optional(),
      subject: z.string().min(5, 'Subject is too short'),
      message: z.string().min(10, 'Message is too short'),
    }),
  }),

  replyToTicket: z.object({
    params: z.object({
      id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Ticket ID'),
    }),
    body: z.object({
      message: z.string().min(1, 'Message is required'),
    }),
  }),
};

module.exports = profileValidator;
