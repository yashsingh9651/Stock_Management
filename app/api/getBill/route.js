import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request){
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);
    let body = await request.json();
    const billNumber = parseInt(body);
    try{
        const database = client.db("stock");
        const billingDetails = database.collection("bills");
        const details = await billingDetails.findOne({billNumber:billNumber});
        return NextResponse.json(details);
    }finally{
        await client.close();
    }
}