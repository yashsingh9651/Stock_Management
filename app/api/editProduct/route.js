import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
export async function POST(request) {
    let body = await request.json();
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);
    try {
      const database = client.db("stock");
      const inventory = database.collection("inventory");
      const filter = {productName:body.productName};
      const updateDoc = {
        $set: {
            productName:body.productName,
            quantity:body.quantity,
            price:body.price
        }
      }
      await inventory.updateOne(filter,updateDoc,{});
      return NextResponse.json({ ok: true, message:"Product updated"});
    } finally {
      await client.close();
    }
  }