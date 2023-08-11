import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
export async function POST(request){
    let body = await request.json();
    const billNumber =  parseInt(body);
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);
    try{
        const database = client.db("stock");
        const billProducts = database.collection("billProducts");
        const query = {billNumber:billNumber};
        const products = await billProducts.find(query).toArray();
        return NextResponse.json(products);
    }finally{
        await client.close();
    }
  }