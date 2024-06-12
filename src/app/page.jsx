"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ImgDelete from '@/assets/img_delete.svg'
import ImgEdit from '@/assets/img_edit.svg'
import ImgAdd from '@/assets/img_add.svg'

export default function Home() {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("/api/questions", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  console.log(questions);

  const deteleQuestion = async (id) => {
    try {
      await fetch(`/api/questions?id=${id}`, {
        method: "DELETE",
      });
      setQuestions(questions.filter((question) => question._id !== id));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  }


  return (
    <div className="p-4 bg-gray-50">
      <div className='flex items-center justify-between mb-2'>
        <h1 className="text-3xl font-semibold text-gray-900">Preguntas</h1>
        <button className="text-gray-500 hover:text-gray-700 bg-gray-200 rounded-lg p-1 border border-gray-600 mr-1">
          <Link href="/add-question">
            <Image src={ImgAdd} height={23} width={23} alt="add-button" />
          </Link>
        </button>
      </div>
      <div className="space-y-4">
        {questions.map((question, index) => (
          <div key={index} className="bg-gray-100 p-4 border border-500 rounded-lg shadow-md">
            <div className='flex items-center justify-between mb-2'>
              <p className="text-lg font-semibold text-gray-800">Pregunta: {index + 1}</p>
              <div className='flex items-center'>
                <button
                  className="text-gray-500 hover:text-gray-700 bg-gray-200 rounded-lg p-1 border border-gray-600 mr-1"
                  onClick={() => deteleQuestion(question._id)}
                >
                  <Image
                    src={ImgDelete}
                    height={23}
                    width={23}
                    alt="delete-button"
                  />
                </button>
                <button
                  className="text-gray-500 hover:text-gray-700 bg-gray-200 rounded-lg p-1 border border-gray-600"
                >
                  <Link href={`/edit-question?id=${question._id}`}>
                    <Image
                      src={ImgEdit}
                      height={23}
                      width={23}
                      alt="edit-button"
                    />
                  </Link>
                </button>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 overflow-x-auto">{question?.question}</h3>
            <div className="space-y-2">
              <p className="text-gray-950 bg-gray-300 p-2 rounded overflow-x-auto">A: {question?.optionA}</p>
              <p className="text-gray-950 bg-gray-300 p-2 rounded overflow-x-auto">B: {question?.optionB}</p>
              <p className="text-gray-950 bg-gray-300 p-2 rounded overflow-x-auto">C: {question?.optionC}</p>
              <p className="text-gray-950 bg-gray-300 p-2 rounded overflow-x-auto">D: {question?.optionD}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}  