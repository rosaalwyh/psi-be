interface CheckoutPayload {
  voucher: {
    amount: number;
    type: "%" | "idr";
  };
  price: number;
}

interface CheckoutResult {
  originalPrice: number;
  discount: number;
  totalPayed: number;
  earnPoints: number;
}

class ECommerceUsecase {
  static checkout(payload: CheckoutPayload): CheckoutResult {
    const { voucher, price } = payload;

    if (!voucher.amount) {
      throw new Error("Invalid request body, please provide voucher!");
    }

    const discount = voucher.type === "%" ? (voucher.amount / 100) * price : voucher.amount;
    const earnPoints = 0.02 * discount;
    const totalPayed = price - discount;

    return { totalPayed, discount, earnPoints, originalPrice: price };
  }
}
export default ECommerceUsecase;
