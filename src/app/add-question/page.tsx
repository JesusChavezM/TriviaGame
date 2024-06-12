"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AddQuestionPage = () => {
    const router = useRouter();
    const [question, setQuestion] = useState("");
    const [optionA, setOptionA] = useState("");
    const [optionB, setOptionB] = useState("");
    const [optionC, setOptionC] = useState("");
    const [optionD, setOptionD] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/questions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    question,
                    optionA,
                    optionB,
                    optionC,
                    optionD,
                }),
            });
            router.push("/");
        } catch (e) {
            setError("Failed to add question");
        }
    };

    return (
        <div className='p-4 bg-gray-50 flex flex-col items-center justify-between'>
            <h1 className='text-3xl font-semibold text-gray-900 mb-4'>Agregar pregunta</h1>
            <form onSubmit={handleSubmit}>
                <span className="className='text-800 font-semibold">Pregunta:</span>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
                />
                <span className="text-800 font-semibold">Opción A:</span>
                <input
                    type="text"
                    value={optionA}
                    onChange={(e) => setOptionA(e.target.value)}
                    className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
                />
                <span className="text-800 font-semibold">Opción B:</span>
                <input
                    type="text"
                    value={optionB}
                    onChange={(e) => setOptionB(e.target.value)}
                    className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
                />
                <span className="text-800 font-semibold">Opción C:</span>
                <input
                    type="text"
                    value={optionC}
                    onChange={(e) => setOptionC(e.target.value)}
                    className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
                />
                <span className="text-800 font-semibold">Opción D:</span>
                <input
                    type="text"
                    value={optionD}
                    onChange={(e) => setOptionD(e.target.value)}
                    className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black"
                />
                <button
                    type="submit"
                    className="w-full bg-600 text-50 py-2 rounded-full hover:bg-700 cursor-pointer"
                >
                    Agregar pregunta
                </button>
            </form>
        </div>
    )
}

export default AddQuestionPage;