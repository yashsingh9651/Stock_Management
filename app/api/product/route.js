import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
export async function GET(request) {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);
  try {
    const database = client.db("stock");
    const inventory = database.collection("inventory");
    const query = {};
    const products = await inventory.find(query).toArray();
    return NextResponse.json({ ok: true, products });
  } finally {
    await client.close();
  }
}
export async function POST(request) {
  let body = await request.json();
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);
  try {
    const database = client.db("stock");
    const inventory = database.collection("inventory");
    const product = await inventory.insertOne(body);
    return NextResponse.json({ ok: true, product });
  } finally {
    await client.close();
  }
}
