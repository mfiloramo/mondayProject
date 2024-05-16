import express, { Router } from 'express';
import { getAllOrders, getOrdersByFragrance, createOrder } from "../controllers/orders.controller";

const router: Router = express.Router();


router.get('/:id', getOrdersByFragrance);
router.get('/', getAllOrders);
router.post('/', createOrder);

export const ordersRouter: Router = router;
