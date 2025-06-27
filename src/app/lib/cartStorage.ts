// lib/cartStorage.ts
// دوال بسيطة للتعامل مع السلة في localStorage

export function getCart() {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function setCart(cart: { slug: string; quantity: number }[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cart', JSON.stringify(cart));
}
