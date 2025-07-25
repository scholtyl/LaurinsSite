import { Router, Request, Response } from "express";
import getDB from "../../DB/db";
import { GuestDTO } from "../../DTOs/Piets/guestDTO";
import { v4 as uuidv4 } from "uuid";

const router = Router();

export async function getAllGuests(): Promise<GuestDTO[]> {
  const db = await getDB();
  const guestsRaw = await db.all("SELECT * FROM guests");

  return guestsRaw.map((g: any) => ({
    id: g.id,
    name: g.name,
    numberOfConsumedDrinks: g.numberOfConsumedDrinks,
    numberOfRemainingDrinks: g.numberOfRemainingDrinks,
  }));
}

router.get("/", async (req: Request, res: Response) => {
  console.log("[Info] All guests requested.");

  const guests = await getAllGuests();
  res.status(201).json(guests);
});

router.get("/subtractDrink/:id", async (req: Request, res: Response) => {
  const guestId = req.params.id;

  if (!guestId) {
    res.status(400).json({ message: "User ID is required." });
    return;
  }
  console.log(`[Info] Subtracting drink requested.`);

  const db = await getDB();
  const guest = await db.get("SELECT * FROM guests WHERE id = ?", [guestId]);

  if (!guest) {
    res.status(404).json({ message: "Guest not found." });
    return;
  }

  await db.run(
    `UPDATE guests
     SET numberOfRemainingDrinks = numberOfRemainingDrinks - 1,
         numberOfConsumedDrinks = numberOfConsumedDrinks + 1
     WHERE id = ?`,
    [guestId]
  );

  const guests = await getAllGuests();
  res.status(200).json(guests);
});

router.put("", async (req: Request, res: Response) => {
  const guest = req.body as GuestDTO;

  // Basic validation
  if (
    guest.name === undefined ||
    guest.numberOfRemainingDrinks === undefined
  ) {
    res.status(400).json({ message: "Missing required fields." });
    return;
  }

  const db = await getDB();

  if (guest.id) {

    const existing = await db.get("SELECT id FROM guests WHERE id = ?", [guest.id]);

    if (!existing) {
      res.status(404).json({ message: `Guest with ID ${guest.id} not found.` });
      return;
    }
    
    // Update existing guest
    console.log(`[Info] Request to update guest ${guest.name} (ID: ${guest.id}).`);

    const updateQuery = `
      UPDATE guests
      SET name = ?, numberOfRemainingDrinks = ?
      WHERE id = ?
    `;

    await db.run(updateQuery, [
      guest.name,
      guest.numberOfRemainingDrinks,
      guest.id,
    ]);

  } else {
    // Insert new guest
    const guestId = uuidv4();

    console.log(`[Info] Request to add new guest ${guest.name}.`);

    const insertQuery = `
      INSERT INTO guests (id, name, numberOfRemainingDrinks, numberOfConsumedDrinks)
      VALUES (?, ?, ?, 0)
    `;

    await db.run(insertQuery, [
      guestId,
      guest.name,
      guest.numberOfRemainingDrinks,
    ]);

  }

  // Return full updated list
  const guests = await getAllGuests();
  res.status(200).json(guests);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const guestId = req.params.id;

  if (!guestId) {
    res.status(400).json({ message: "Guest ID is required." });
    return;
  }

  const db = await getDB();

  // Check if guest exists
  const guest = await db.get("SELECT id FROM guests WHERE id = ?", [guestId]);

  if (!guest) {
    res.status(404).json({ message: `Guest with ID ${guestId} not found.` });
    return;
  }

  // Delete guest
  await db.run("DELETE FROM guests WHERE id = ?", [guestId]);
  console.log(`[Info] Guest ${guestId} deleted.`);

  // Return updated list
  const guests = await getAllGuests();
  res.status(200).json(guests);
});

export default router;
