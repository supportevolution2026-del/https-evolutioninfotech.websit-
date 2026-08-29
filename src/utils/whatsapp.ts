import { Product, CartItem } from '@/types';

export const WHATSAPP_PHONE_NUMBER = '918401945508';
export const WHATSAPP_DISPLAY_PHONE = '+91 918401945508';
export const SUPPORT_EMAIL = 'support.evolution2026@gmail.com';
export const COMPANY_NAME = 'Evolution Infotech';
export const STORE_ADDRESS = '116, Shayona Arcade, Shyam Shikhar, Bapunagar, Ahmedabad, Gujarat 380024';
export const OFFICIAL_STORE_ADDRESS = STORE_ADDRESS;
export const GOOGLE_MAPS_URL = 'https://maps.google.com/?q=116,+Shayona+Arcade,+Shyam+Shikhar,+Bapunagar,+Ahmedabad,+Gujarat+380024';

/**
 * Generate direct WhatsApp URL for ordering a single product
 */
export function getProductWhatsAppUrl(product: Product, quantity = 1): string {
  const currentUrl = typeof window !== 'undefined' ? `${window.location.origin}/products/${product.slug}` : `https://evolutioninfotech.in/products/${product.slug}`;
  const totalPrice = (product.price * quantity).toLocaleString('en-IN');
  const unitPrice = product.price.toLocaleString('en-IN');

  const text = 
`*NEW ORDER INQUIRY - ${COMPANY_NAME}*

Hello, I want to order/inquire about this product:

*Product:* ${product.name}
*Brand:* ${product.brand}
*SKU / Model:* ${product.sku}
*Price:* ₹${unitPrice} per unit
*Quantity:* ${quantity}
*Total Estimated:* ₹${totalPrice}

*Link:* ${currentUrl}

Please share payment options (UPI/Bank Transfer/COD) and estimated delivery time.`;

  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Generate direct WhatsApp URL for entire Cart Checkout
 */
export function getCartWhatsAppUrl(
  items: CartItem[],
  subtotal: number,
  discount: number,
  tax: number,
  shipping: number,
  total: number,
  couponCode?: string,
  customerName?: string,
  customerAddress?: string
): string {
  let itemsList = items
    .map((item, index) => {
      const itemTotal = (item.product.price * item.quantity).toLocaleString('en-IN');
      return `${index + 1}. *${item.product.name}*\n   Qty: ${item.quantity} × ₹${item.product.price.toLocaleString('en-IN')} = ₹${itemTotal}`;
    })
    .join('\n\n');

  let text = `*NEW CART ORDER - ${COMPANY_NAME}*\n\n`;

  if (customerName) {
    text += `*Customer:* ${customerName}\n`;
  }
  if (customerAddress) {
    text += `*Delivery Address:* ${customerAddress}\n`;
  }
  if (customerName || customerAddress) {
    text += `\n`;
  }

  text += `*ORDER ITEMS:*\n${itemsList}\n\n`;
  text += `-------------------------------------\n`;
  text += `Subtotal: ₹${subtotal.toLocaleString('en-IN')}\n`;
  if (discount > 0) {
    text += `Discount (${couponCode || 'Promo'}): -₹${discount.toLocaleString('en-IN')}\n`;
  }
  text += `GST (18%): ₹${tax.toLocaleString('en-IN')}\n`;
  text += `Shipping: ${shipping === 0 ? 'FREE' : `₹${shipping}`}\n`;
  text += `*GRAND TOTAL: ₹${total.toLocaleString('en-IN')}*\n`;
  text += `-------------------------------------\n\n`;
  text += `Please confirm my order and send payment details (UPI/NetBanking).`;

  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Generate direct WhatsApp URL for booking IT Services
 */
export function getServiceBookingWhatsAppUrl(serviceTitle: string, customNotes?: string): string {
  let text = 
`*IT SERVICE & CONSULTATION BOOKING*
Company: ${COMPANY_NAME}

I would like to book / consult on the following enterprise IT service:
*Service Requested:* ${serviceTitle}
`;

  if (customNotes && customNotes.trim()) {
    text += `*Requirements / Notes:* ${customNotes.trim()}\n`;
  }

  text += `\nPlease connect me with your technical project manager for feasibility, SLA and custom pricing.`;

  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Generate custom WhatsApp inquiry URL
 */
export function getCustomWhatsAppUrl(topic: string, message?: string): string {
  let text = `*Hello ${COMPANY_NAME} Support Team!*\n\n`;
  text += `Topic: *${topic}*\n`;
  if (message && message.trim()) {
    text += `Message: ${message.trim()}\n`;
  } else {
    text += `I have an inquiry regarding IT hardware & enterprise solutions.\n`;
  }
  text += `\nPlease reply with details.`;

  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
}
