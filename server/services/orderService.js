const Order = require('../models/Order');

const updateOrderStatus = async (orderId) => {
  try {
    await Order.findByIdAndUpdate(orderId, {
      status: 'ready',
      readyAt: new Date()
    });
    console.log(`Pedido ${orderId} actualizado a estado: listo para retirar`);
  } catch (error) {
    console.error(`Error actualizando pedido ${orderId}:`, error);
  }
};