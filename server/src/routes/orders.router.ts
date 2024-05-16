import express, { Router } from 'express';
import { getAllOrders, getOrdersByFragrance, createOrder } from "../controllers/orders.controller";


const router: Router = express.Router();

router.get('/', getAllOrders);
router.get('/:name', getOrdersByFragrance);
router.post('/', createOrder);


export const ordersRouter: Router = router;