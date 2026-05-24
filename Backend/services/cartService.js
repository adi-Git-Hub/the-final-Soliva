const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');

class CartService {
  async getCart(userId) {
    let cart = await Cart.findOne({ user: userId }).populate('cartItems.product');
    if (!cart) {
      return { cartItems: [], totalPrice: 0 };
    }
    return cart;
  }

  async addToCart(userId, productId, quantity) {
    const product = await Product.findById(productId);
    if (!product) {
      throw new ErrorHandler('Product not found', 404);
    }

    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      const itemIndex = cart.cartItems.findIndex((p) => p.product.toString() === productId);
      if (itemIndex > -1) {
        cart.cartItems[itemIndex].quantity += quantity;
      } else {
        cart.cartItems.push({ product: productId, quantity });
      }
    } else {
      cart = await Cart.create({
        user: userId,
        cartItems: [{ product: productId, quantity }],
      });
    }

    await this.recalculateCart(cart);
    return cart;
  }

  async removeFromCart(userId, productId) {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      throw new ErrorHandler('Cart not found', 404);
    }

    cart.cartItems = cart.cartItems.filter(
      (item) => item.product.toString() !== productId
    );

    await this.recalculateCart(cart);
    return cart;
  }

  async updateCartItem(userId, productId, quantity) {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      throw new ErrorHandler('Cart not found', 404);
    }

    const itemIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.cartItems[itemIndex].quantity = quantity;
    } else {
      throw new ErrorHandler('Item not found in cart', 404);
    }

    await this.recalculateCart(cart);
    return cart;
  }

  async clearCart(userId) {
    await Cart.findOneAndDelete({ user: userId });
  }

  /**
   * Merge a batch of items (e.g. a guest cart at sign-in time) into the
   * user's server cart. Idempotent: for each incoming line we sum the
   * quantity onto an existing line or push a new one. Unknown product IDs
   * are silently skipped so a stale guest cart doesn't break login.
   */
  async mergeCart(userId, incomingItems) {
    if (!Array.isArray(incomingItems) || incomingItems.length === 0) {
      return this.getCart(userId);
    }

    // Validate that every product still exists. Skip ghosts.
    const ids = incomingItems
      .map((i) => i.productId)
      .filter((id) => typeof id === 'string');
    const liveProducts = await Product.find({ _id: { $in: ids } }).select('_id');
    const validIds = new Set(liveProducts.map((p) => String(p._id)));

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await Cart.create({ user: userId, cartItems: [] });
    }

    for (const item of incomingItems) {
      if (!validIds.has(String(item.productId))) continue;
      const qty = Math.max(1, parseInt(item.quantity, 10) || 1);
      const idx = cart.cartItems.findIndex(
        (p) => p.product.toString() === item.productId
      );
      if (idx > -1) {
        cart.cartItems[idx].quantity += qty;
      } else {
        cart.cartItems.push({ product: item.productId, quantity: qty });
      }
    }

    await this.recalculateCart(cart);
    return cart;
  }

  async recalculateCart(cart) {
    await cart.populate('cartItems.product');
    cart.totalPrice = cart.cartItems.reduce((acc, item) => {
      // Handle cases where product might be deleted but still in cart (safeguard)
      if (item.product) {
        return acc + item.product.price * item.quantity;
      }
      return acc;
    }, 0);
    await cart.save();
  }
}

module.exports = new CartService();