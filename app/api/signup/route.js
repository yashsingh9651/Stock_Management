import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
export async function POST(request) {
    let body = await request.json();
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);
    try {
      const database = client.db("stock");
      const user = database.collection("users");
      const {username, password,email} = body;
      const checking = await user.findOne({email: email});
      if (checking) {
          return NextResponse.json({ ok: false, message:"User With This Email is already Existed"});
        }else{
            await user.insertOne({username,email,password:await hash(password,12)})
            return NextResponse.json({ ok: true,message:'Registered Successfully' });
        }
    } finally {
      await client.close();
    }
  }