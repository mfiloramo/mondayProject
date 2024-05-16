import { Request, Response } from 'express';
import { sequelize } from "../config/sequelize";
import axios from 'axios';

export const selectAllFragrances = async (req: Request, res: Response): Promise<void> => {
  try {
    // SELECT ALL FRAGRANCES IN DATABASE
    const selectAll = await sequelize.query('EXECUTE GetAllFragrances');

    const apiToken: string | undefined = process.env.MONDAY_API_TOKEN;

    // TEST: MONDAY.COM API INTEGRATION
    let query: string =
      `{
          boards (limit:5) {
            name
            id
            description
          }
      }`;

    let mondayApiResponse: any = {};
    if (apiToken) {
      const response: globalThis.Response = await fetch("https://api.monday.com/v2", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': apiToken
        },
        body: JSON.stringify({ query })
      });

      mondayApiResponse = await response.json();
    }

    // TEST: COMBINE DATABASE + MONDAY API RESULTS
    const result = {
      fragrances: selectAll[0],
      mondayApi: mondayApiResponse
    };

    // TEST: SEND COALESCED RESULTS
    res.json(result);

  } catch (error: any) {
    // ERROR HANDLING
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