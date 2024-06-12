"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const EditQuestion = () => {
    const router = useRouter();
    const [question, setQuestion] = useState("");
    const [optionA, setOptionA] = useState("");
    const [optionB, setOptionB] = useState("");
    const [optionC, setOptionC] = useState("");
    const [optionD, setOptionD] = useState("");

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        const fetchQuestionData = async () => {
            try {
                const response = await fetch(`/api/question?id=${id}`);
                const data = await response.json();
                if (data) {
                    setQuestion(data.question || "");
                    setOptionA(data.optionA || "");
                    setOptionB(data.optionB || "");
                    setOptionC(data.optionC || "");
                    setOptionD(data.optionD || "");
                }

            } catch (error) {
                console.error("Error fetching question data:", error);
            }
        };
        fetchQuestionData();
    }, []);



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        const questionData = {
            question,
            optionA,
            optionB,
            optionC,
            optionD,
        };

        try {
            await fetch(`/api/questions?id=${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(questionData),
            });
            router.push('/');
        } catch (error) {
            console.error("Error updating question:", error);
        }
    }

    return (
        <div className='p-4 bg-gray-50 flex flex-col items-center justify-between'>
            <h1 className='text-3xl font-semibold text-gray-900 mb-4'>Editar pregunta</h1>
            <form onSubmit={handleSubmit}>
                <span className='text-800 font-semibold'>Pregunta:</span>
                <input id='question' type='text' value={question} onChange={(e) => setQuestion(e.target.value)} className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black" />
                <span className='text-800 font-semibold'>Opción A:</span>
                <input id='optionA' type='text' value={optionA} onChange={(e) => setOptionA(e.target.value)} className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black" />
                <span className='text-800 font-semibold'>Opción B:</span>
                <input id='optionB' type='text' value={optionB} onChange={(e) => setOptionB(e.target.value)} className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black" />
                <span className='text-800 font-semibold'>Opción C:</span>
                <input id='optionC' type='text' value={optionC} onChange={(e) => setOptionC(e.target.value)} className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black" />
                <span className='text-800 font-semibold'>Opción D:</span>
                <input id='optionD' type='text' value={optionD} onChange={(e) => setOptionD(e.target.value)} className="w-full border border-600 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-900 focus:text-black" />
                <button type="submit" className='w-full bg-600 text-50 py-2 rounded-full hover:bg-700 cursor-pointer'>
                    Guardar cambios
                </button>
            </form>
        </div>
    )
}

export default EditQuestion;