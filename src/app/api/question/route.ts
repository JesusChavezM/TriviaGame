import connect from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { parse } from "url";
import Question from "@/models/questions";

export const dynamic = "force-dynamic";

export async function GET(request: any) {
    const { query } = parse(request.url, true);
    const { id } = query;
    await connect();

    try {
        const question = await Question.findById(id);

        if (!question) {
            return new NextResponse("Question not found", { status: 404 });
        }

        return new NextResponse(JSON.stringify(question), {
            headers: {
                "Content-Type": "application/json",
            },
        });

    } catch (err: any) {
        return new NextResponse("Error fetching question", { status: 500 });
    }
}
