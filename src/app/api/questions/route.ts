import { MongoClient, ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'url';
import Question from '@/models/questions';
import connect from '@/lib/mongodb';

export const dynamic = "force-dynamic";

export async function GET(request: any) {
    await connect();
    const questions = await Question.find({});
    return new NextResponse(JSON.stringify(questions), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
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