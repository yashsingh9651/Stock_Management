import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";   
import { compare } from "bcryptjs";                  
export async function POST(request) {
    let body = await request.json();
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);
    try {
      const database = client.db("stock");
      const user = database.collection("users");
      const checkingUser = await user.findOne({email: body.email});
      if (checkingUser && (await compare(body.password,checkingUser.password))) {
        const {password,...userWithoutPass} = checkingUser
            return NextResponse.json(userWithoutPass);
        }else{
            return NextResponse.json({ ok: false,message:'Incorrect Credentials' });
        }
    } finally {
      await client.close();
    }
  }