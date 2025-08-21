import express from "express";
import ECommerceController from "../../controllers/e-commerce";

const eCommerceRouter = express();

eCommerceRouter.post("/", ECommerceController.Checkout);

export default eCommerceRouter;
