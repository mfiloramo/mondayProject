import { Request, Response } from "express";
import { sequelize } from "../config/sequelize";


export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    // SELECT ALL ORDERS IN DATABASE
    const selectAll = await sequelize.query('EXECUTE GetAllOrders')
    res.send(selectAll[0]);
    // ERROR HANDLING
  } catch (error: any) {
    res.status(500).send(error);
    console.error(error);
  }
}

export const getOrdersByFragrance = async (req: Request, res: Response): Promise<void> => {
  try {
    // FRAGRANCE ORDER DATA PAYLOAD
    const { id } = req.query;

    // RETRIEVE ORDERS BY FRAGRANCE ID
    const response = await sequelize.query('EXECUTE GetOrdersByFragrance :id', {
      replacements: { id }
    })
    res.json(response[0]);
  } catch (error: any) {
    // ERROR HANDLING
    res.status(500).send(error);
    console.error(error);
  }
}

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    // ORDER DATA PAYLOAD
    const { id, created_at, updated_at, number_of_kits, fragrance1_id, fragrance2_id, fragrance3_id } = req.body;

    // ADD ORDER TO DATABASE
    const response = await sequelize.query('EXECUTE UpdateFragrance :id, :created_at, :updated_at, :number_of_kits, :fragrance1_id, :fragrance2_id, :fragrance3_id', {
      replacements: { id, created_at, updated_at, number_of_kits, fragrance1_id, fragrance2_id, fragrance3_id }
    })
    res.json(response[0]);
  } catch (error: any) {
    // ERROR HANDLING
    res.status(500).send(error);
    console.error(error);
  }
}