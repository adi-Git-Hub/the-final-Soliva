const { z } = require('zod');

const cartValidator = {
  addToCart: z.object({
    body: z.object({
      productId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Product ID'),
      quantity: z.number().int().positive('Quantity must be at least 1'),
    }),
  }),

  updateCartItem: z.object({
    body: z.object({
      quantity: z.number().int().positive('Quantity must be at least 1'),
    }),
    params: z.object({
      productId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Product ID'),
    }),
  }),

  removeFromCart: z.object({
    params: z.object({
      productId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Product ID'),
    }),
  }),

  mergeCart: z.object({
    body: z.object({
      items: z
        .array(
          z.object({
            productId: z
              .string()
              .regex(/^[0-9a-fA-F]{24}$/, 'Invalid Product ID'),
            quantity: z.number().int().positive(),
          })
        )
        .max(100, 'Too many items in guest cart'),
    }),
  }),
};

module.exports = cartValidator;