import { Router, Request, Response } from "express";
import getDB from "../../DB/db";
import { GuestDTO } from "../../DTOs/Piets/guestDTO";
import { v4 as uuidv4 } from "uuid";

const router = Router();

router.get("/guests", async (req: Request, res: Response) => {
  console.log("[Info] All guests requested.");

  const db = await getDB();

  const guestsRaw = await db.all("SELECT * FROM guests");

  const guets: GuestDTO[] = guestsRaw.map((guest: any) => ({
    id: guest.id,
    name: guest.name,
    numberOfConsumedDrinks: guest.numberOfConsumedDrinks,
    numberOfRemainingDrinks: guest.numberOfRemainingDrinks,
  }));

  res.status(201).json(guets);
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

  // Return updated guest list
  const guestsRaw = await db.all("SELECT * FROM guests");
  const guests: GuestDTO[] = guestsRaw.map((guest: any) => ({
    id: guest.id,
    name: guest.name,
    numberOfConsumedDrinks: guest.numberOfConsumedDrinks,
    numberOfRemainingDrinks: guest.numberOfRemainingDrinks,
  }));

  res.status(200).json(guests);
});

router.post("", async (req: Request, res: Response) => {
  const guest = req.body as GuestDTO;
  if (!guest.id || !guest.name == undefined || !guest.numberOfRemainingDrinks == undefined) {
    res.status(400).json({ message: "Not all required fields present." });
    return;
  }

  console.log(`[Info] Request to add guest ${guest.name}.`);

  const guestId = uuidv4();

  const query = `
  INSERT INTO guests (
    id, name, numberOfRemainingDrinks, numberOfConsumedDrinks ) 
    VALUES (?, ?, ?, ?)
    `;

  let db = await getDB();
  await db.run(query, [guestId, guest.name, guest.numberOfRemainingDrinks, 0]);

  console.log(`[Info] Guest ${guest.name} added.`);

  const guestsRaw = await db.all("SELECT * FROM users");

  const guets: GuestDTO[] = guestsRaw.map((guest: any) => ({
    id: guest.id,
    name: guest.name,
    numberOfConsumedDrinks: guest.numberOfConsumedDrinks,
    numberOfRemainingDrinks: guest.numberOfRemainingDrinks,
  }));

  res.status(201).json(guets);
});

export default router;
