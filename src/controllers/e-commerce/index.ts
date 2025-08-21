import { Request, Response } from "express";

import ECommerceUsecase from "../../usecases/e-commerce";
interface CheckoutReqBody {
  voucher: {
    amount: number;
    type: "%" | "idr";
  };
  price: number;
}

class ECommerceController {
  static async Checkout(req: Request<{}, {}, CheckoutReqBody>, res: Response) {
    try {
      const defaultVoucher = {
        amount: 0,
        type: "%",
      };
      const { voucher, price } = req.body;

      if (!price) {
        return res.status(400).json({
          message: "Invalid request body, please provide price!",
        });
      }

      const result = await ECommerceUsecase.checkout({ voucher: voucher ?? defaultVoucher, price });

      res.status(200).json({
        message: "Successfully checkout!",
        data: result,
      });
    } catch (error) {
      console.log(error, "error");

      res.status(500).json({ message: "Internal server error" });
    }
  }
}
export default ECommerceController;
