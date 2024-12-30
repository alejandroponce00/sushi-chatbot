const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  items: [{
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'ready', 'completed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  readyAt: {
    type: Date
  }
});

// Middleware para actualizar el estado después de 2 minutos
OrderSchema.post('save', function(doc) {
  if (doc.status === 'pending') {
    setTimeout(async () => {
      const orderService = require('../services/orderService');
      await orderService.updateOrderStatus(doc._id);
    }, 2 * 60 * 1000); // 2 minutos
  }
});

module.exports = mongoose.model('Order', OrderSchema);