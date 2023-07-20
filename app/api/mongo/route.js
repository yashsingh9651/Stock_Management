import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
export async function GET(request) {
    const uri = "mongodb+srv://singhyash9009670:YASHsingh967@cluster0.fjlgyjw.mongodb.net/";
const client = new MongoClient(uri);
  try {
    const database = client.db('singhyash9009670');
    const movies = database.collection('Akanksha Enterprises');
    const query = {};
    const movie = await movies.findOne(query);
    console.log(movie);
    return NextResponse.json({"a":34,movie:movie})
} finally {
    await client.close();
  }
}