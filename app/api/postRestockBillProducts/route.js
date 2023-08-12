import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
export async function POST(request){
    let body = await request.json();
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);
  try {
    const database = client.db("stock");
    const billProducts = database.collection("restockBillProducts");
    await billProducts.insertMany(body);
    return NextResponse.json({ ok: true,message:"Restock Bill Added Successfully" });
   }finally {
    await client.close();
  }
}
