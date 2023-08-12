import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
// Sending data to mongo DB...
export async function POST(request){
    let body = await request.json();
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);
  try {
    const database = client.db("stock");
    const bills = database.collection("bills");
    await bills.insertOne(body);
    return NextResponse.json({ ok: true });
   }finally {
    await client.close();
  }
}
// Fetching bills from database...
export async function GET(request){
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);
  try {
    const database = client.db("stock");
    const bills = database.collection("bills");
    const query = {};
    const allBills = await bills.find(query).toArray();
    return NextResponse.json(allBills);
   }finally {
    await client.close();
  }
}