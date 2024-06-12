import { MongoClient, ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'url';
import Question from '@/models/questions';
import connect from '@/lib/mongodb';

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    const url = process.env.MONGO_URI || "";

    const client = new MongoClient(url);

    try {
        await client.connect();

        const collection = client.db("test").collection("questions");

        const questions = await collection.find({}).toArray();

        return NextResponse.json(questions);
    } catch (err: any) {
        console.log(err);
        return NextResponse.json({ message: "Error fetching questions" }, { status: 500 });
    } finally {
        await client.close();
    }

}

export async function POST(request: any) {
    let { question, optionA, optionB, optionC, optionD } = await request.json();

    await connect();

    const newQuestion = new Question({
        question,
        optionA,
        optionB,
        optionC,
        optionD,
    });

    try {
        await newQuestion.save();
        return new NextResponse("Question added successfully", { status: 200 });
    } catch (err: any) {
        console.log("Error: ", err);
        return new NextResponse("Error adding question", { status: 500 });
    }
}

export async function PUT(request: any) {
    try {
        const { query } = parse(request.url, true);
        const { id } = query;

        if (!id) {
            return new NextResponse("Id is required", { status: 400 });
        }

        const { question, optionA, optionB, optionC, optionD } = await request.json();

        if (!question || !optionA || !optionB || !optionC || !optionD) {
            return new NextResponse("All fields are required", { status: 400 });
        }

        const updatedQuestion = await Question.findByIdAndUpdate(id, { question, optionA, optionB, optionC, optionD }, { new: true });

        if (!updatedQuestion) {
            return new NextResponse("Question not found", { status: 404 });
        }

        return new NextResponse(updatedQuestion, { status: 200 });
    } catch (err: any) {
        console.log("Error: ", err);
        return new NextResponse("Error updating question", { status: 500 });
    }
}

export const DELETE = async (request: any) => {
    const { query } = parse(request.url, true);
    const { id } = query;

    await connect();

    try {
        await Question.findByIdAndDelete(id);
        return new NextResponse("Question deleted successfully", { status: 200 });
    } catch (err: any) {
        console.log("Error: ", err);
        return new NextResponse("Error deleting question", { status: 500 });
    }
}