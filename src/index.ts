
import express from "express";
import type { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app: Express = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
const prisma = new PrismaClient();

// users
app.get("/getUsers", async (req: Request, res: Response) => {
  try {
    const getUsers = await prisma.users.findMany();
    return res.json(getUsers);  // 成功時のレスポンス
  } catch (e) {
    console.error(e);  // エラー内容をログに出力
  }
});
app.post("/createUser", async (req: Request, res: Response) => {
  try {
    const { id, name, email } = req.body;
    const createUser = await prisma.users.create({
      data: {
        id,
        name,
        email
      },
    });
    return res.json(createUser);  // 成功時のレスポンス
  } catch (e) {
    console.error(e);  // エラー内容をログに出力
  }
});
app.put("/editUser/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { name, email, tel, post, prefecture, city, address1, address2, created_at, updated_at } = req.body;

    const editUser = await prisma.users.update({
      where: { id },
      data: {
        id,
        name,
        email,
        tel,
        post,
        prefecture,
        city,
        address1,
        address2,
        created_at,
        updated_at
      },
    });
    return res.json(editUser);  // 成功時のレスポンス
  } catch (e) {
    console.error(e);  // エラー内容をログに出力
  }
});

// items
app.get("/getItems", async (req: Request, res: Response) => {
  try {
    const getItems = await prisma.items.findMany();
    const new_data = JSON.stringify(getItems, (key, value) => {
      return typeof value === 'bigint' ? value.toString() : value;
    });
    return res.json(JSON.parse(new_data));  // 成功時のレスポンス
  } catch (e) {
    console.error(e);  // エラー内容をログに出力
  }
});
app.post("/createItem", async (req: Request, res: Response) => {
  try {
    const { name, category, price, capacity, maximum_temperature } = req.body;
    const createItem = await prisma.items.create({
      data: {
        name,
        category,
        price,
        capacity,
        maximum_temperature,
      },
    });
    // BigInt を string に変換してレスポンスを返す
    const new_data = JSON.stringify(createItem, (key, value) => {
      return typeof value === "bigint" ? value.toString() : value;
    });
    return res.json(new_data);  // 成功時のレスポンス
  } catch (e) {
    console.error(e);  // エラー内容をログに出力
  }
});
app.put("/editItem/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { name, category, price, capacity, maximum_temperature } = req.body;

    const editItem = await prisma.items.update({
      where: { id },
      data: {
        name,
        category,
        price,
        capacity,
        maximum_temperature,
      },
    });
    // BigInt を string に変換してレスポンスを返す
    const new_data = JSON.stringify(editItem, (key, value) => {
      return typeof value === "bigint" ? value.toString() : value;
    });
    return res.json(new_data);  // 成功時のレスポンス
  } catch (e) {
    console.error(e);  // エラー内容をログに出力
  }
});
app.delete("/deleteItem/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deleteItem = await prisma.items.delete({
      where: { id },
    });
    // BigInt を string に変換してレスポンスを返す
    const new_data = JSON.stringify(deleteItem, (key, value) => {
      return typeof value === "bigint" ? value.toString() : value;
    });
    return res.json(new_data);  // 成功時のレスポンス
  } catch (e) {
    console.error(e);  // エラー内容をログに出力
  }
});

// reservations
app.get("/getReservations", async (req: Request, res: Response) => {
  try {
    const getReservations = await prisma.reservations.findMany();
    const new_data = JSON.stringify(getReservations, (key, value) => {
      return typeof value === 'bigint' ? value.toString() : value;
    });
    return res.json(JSON.parse(new_data));  // 成功時のレスポンス
  } catch (e) {
    console.error(e);  // エラー内容をログに出力
  }
});
app.post("/createReservations", async (req: Request, res: Response) => {
  try {
    const { user_id, items_list, people_cont, date, start_time } = req.body;
    const createReservation = await prisma.reservations.create({
      data: {
        users: {
          connect: {
            id: user_id,
          }
        },
        items_list,
        people_cont,
        date,
        start_time
      },
    });
    // BigInt を string に変換してレスポンスを返す
    const new_data = JSON.stringify(createReservation, (key, value) => {
      return typeof value === "bigint" ? value.toString() : value;
    });
    return res.json(new_data);  // 成功時のレスポンス
  } catch (e) {
    console.error(e);  // エラー内容をログに出力
  }
});

app.listen(PORT, () => console.log("server is running🚀"));

// upsert
// app.post("/createUser/:id", async (req: Request, res: Response) => {
//   try {
//     const { id, name, email } = req.body;

//     const createUser = await prisma.users.upsert({
//       where: { id },
//       create: {
//         id,
//         name,
//         email
//       },
//       update: {},
//     });
//     return res.json(createUser);  // 成功時のレスポンス
//   } catch (e) {
//     console.error(e);  // エラー内容をログに出力
//   }
// });