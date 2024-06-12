import { MongoClient, ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'url';
import connect from '@/lib/mongodb';

export const dynamic = "force-dynamic";

export async function GET() {

    await connect();

    try {
        await client.connect();
        const collection = client.db("test").collection("questions");
        const users = await collection.find({}).toArray();
        return NextResponse.json(users);
    } catch (err) {
        console.error("Error:", err);
        return NextResponse.json({ error: 'Error conectando a la base de datos' });
    } finally {
        await client.close();
    }
}
