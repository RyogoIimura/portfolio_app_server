
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
app.get("/allUsers", async (req: Request, res: Response) => {
  const allUsers = await prisma.users.findMany();
  return res.json(allUsers);
});
app.post("/createUser", async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const createItem = await prisma.users.create({
      data: {
        name,
        email
      },
    });
    return res.json(createItem);  // 成功時のレスポンス
  } catch (e) {
    console.error(e);  // エラー内容をログに出力
  }
});

// items
app.get("/allItems", async (req: Request, res: Response) => {
  const allItems = await prisma.items.findMany();
  const new_data = JSON.stringify(allItems, (key, value) => {
    return typeof value === 'bigint' ? value.toString() : value;
  });
  return res.json(JSON.parse(new_data));
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
    const createItemStringified = JSON.stringify(createItem, (key, value) => {
      return typeof value === "bigint" ? value.toString() : value;
    });
    return res.json(createItemStringified);  // 成功時のレスポンス
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
    const editedItemStringified = JSON.stringify(editItem, (key, value) => {
      return typeof value === "bigint" ? value.toString() : value;
    });
    return res.json(editedItemStringified);  // 成功時のレスポンス
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
    const deleteItemStringified = JSON.stringify(deleteItem, (key, value) => {
      return typeof value === "bigint" ? value.toString() : value;
    });
    return res.json(deleteItemStringified);  // 成功時のレスポンス
  } catch (e) {
    console.error(e);  // エラー内容をログに出力
  }
});

// reservations

app.listen(PORT, () => console.log("server is running🚀"));
