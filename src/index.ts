
import express from "express";
import type { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app: Express = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
const prisma = new PrismaClient();

// 全て取得
app.get("/allItems", async (req: Request, res: Response) => {
  const allItems = await prisma.items.findMany();
  const new_data = JSON.stringify(allItems, (key, value) => {
    return typeof value === 'bigint' ? value.toString() : value;
  });
  return res.json(JSON.parse(new_data));
});

// 作成
app.post("/createItem", async (req: Request, res: Response) => {
  try {
    const { name, category, price, capacity, maximum_temperature } = req.body;
    const createItem = await prisma.items.create({
      data: {
        name,
        category: category.toString(),
        price,
        capacity,
        maximum_temperature,
      },
    });
    return res.json(createItem);
  } catch (e) {
    return res.status(400).json(e);
  }
});

// 編集
app.put("/editItem/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { name, category, price, capacity, maximum_temperature } = req.body;

    const editItem = await prisma.items.update({
      where: { id },
      data: {
        name,
        category: parseInt(category),  // 必要なら型変換
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

    // // Prisma エラーの詳細を適切に返す
    // return res.status(400).json({
    //   error: "Failed to update item",
    //   message: e.message,  // エラーメッセージ
    //   details: e,  // エラーの詳細
    // });
  }
});
// app.put("/editItem/:id", async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;
//     const { name, category, price, capacity, maximum_temperature } = req.body;
//     const editItem = await prisma.items.update({
//       where: { id },
//       data: {
//         name,
//         category: parseInt(category),
//         price,
//         capacity,
//         maximum_temperature,
//       },
//     });
//     console.log(res);
//     return res.json(editItem);
//   } catch (e) {
//     return res.status(400).json(e);
//   }
// });

// Todo を削除
app.delete("/deleteItem/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deleteItem = await prisma.items.delete({
      where: { id },
    });
    return res.json(deleteItem);
  } catch (e) {
    return res.status(400).json(e);
  }
});

app.listen(PORT, () => console.log("server is running🚀"));
