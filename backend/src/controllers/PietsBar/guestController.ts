import { Router, Request, Response } from "express";
import getDB from "../../DB/db";
import { GuestDTO } from "../../DTOs/Piets/guestDTO";

const router = Router();

router.get("/guests", async (req: Request, res: Response) => {
  console.log("[Info] All guests requested.");

//   const db = await getDB();

//   const query = `
//     SELECT 
//         u.*, 
//         t.latest_date AS latest_training_date
//     FROM users u
//     LEFT JOIN (
//         SELECT user_id, MAX(date) AS latest_date
//         FROM trainings
//         GROUP BY user_id
//     ) t ON u.id = t.user_id;
// `;

//   const usersRaw = await db.all(query);

//   const guets: GastDTO[] = usersRaw.map((user: any) => ({
//     id: user.id,
//     name: user.name,
//     lastTraining: user.latest_training_date ?? null,
//   }));

  let guets : GuestDTO[] = [
      { id: "1", name: "Laurin", numberOfConsumedDrinks: 200, numberOfRemainingDrinks: 3},
      { id: "2", name: "Piet", numberOfConsumedDrinks: 200, numberOfRemainingDrinks: 2},
      { id: "3", name: "Tristan", numberOfConsumedDrinks: 200, numberOfRemainingDrinks: 4},
      { id: "4", name: "Youri", numberOfConsumedDrinks: 200, numberOfRemainingDrinks: -1}
    ]

  res.json(guets);
});

export default router;
