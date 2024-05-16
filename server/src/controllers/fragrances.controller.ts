import { Request, Response } from 'express';
import { sequelize } from "../config/sequelize";


export const selectAllFragrances = async (req: Request, res: Response): Promise<void> => {
  try {
    // SELECT ALL FRAGRANCES IN DATABASE
    const selectAll = await sequelize.query('EXECUTE GetAllFragrances')
    res.send(selectAll[0]);
    // ERROR HANDLING
  } catch (error: any) {
    res.status(500).send(error);
    console.error(error);
  }
}

export const addFragrance = async (req: Request, res: Response): Promise<void> => {
  try {
    // FRAGRANCE DATA PAYLOAD
    const { id, name, description, category, created_at, updated_at, image_url } = req.body;

    // ADD FRAGRANCE TO DATABASE
    const response = await sequelize.query('EXECUTE AddFragrance :id, name, description, category, created_at, updated_at, image_url', {
      replacements: { id, name, description, category, created_at, updated_at, image_url }
    })
    res.json(response[0]);
  } catch (error: any) {
    // ERROR HANDLING
    res.status(500).send(error);
    console.error(error);
  }
}

export const updateFragrance = async (req: Request, res: Response): Promise<void> => {
  try {
    // FRAGRANCE DATA PAYLOAD
    const { id, name, description, category, updated_at, image_url } = req.body; // MAY BE A DIFFERENT PROPERTY

    // ADD FRAGRANCE TO DATABASE
    const response = await sequelize.query('EXECUTE UpdateFragrance :id, name, description, category, updated_at, image_url', {
      replacements: { id, name, description, category, updated_at, image_url }
    })
    res.json(response[0]);
  } catch (error: any) {
    // ERROR HANDLING
    res.status(500).send(error);
    console.error(error);
  }
}

export const deleteFragrance = async (req: Request, res: Response): Promise<void> => {
  try {
    // FRAGRANCE DATA PAYLOAD
    const { id } = req.body; // MAY BE A DIFFERENT PROPERTY

    // DELETE FRAGRANCE FROM DATABASE
    await sequelize.query('EXECUTE DeleteFragrance :id', {
      replacements: { id }
    })
    res.json(`Fragrance ${ id } deleted successfully`);
  } catch (error: any) {
    // ERROR HANDLING
    res.status(500).send(error);
    console.error(error);
  }
}