"use client";
import React, { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';

interface Message {
    text: string;
    date: string;
    isUser: boolean;
}

export default function Chatbot() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [apiKey, setApiKey] = useState<string>("");

    useEffect(() => {
        const key = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY;
        setApiKey(key ?? "");
        if (!key) {
            console.error("API key not found in environment variables");
        }
    }, []);

    const fetchAIResponse = async (userMessage: string): Promise<string> => {
        setIsLoading(true);
        try {
            if (!apiKey) {
                console.error("API key is missing or empty");
                return "Error: API key not configured correctly. Please check your environment variables.";
            }

            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "deepseek/deepseek-r1:free",
                    messages: [
                        { role: "user", content: userMessage }
                    ]
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("API Error:", errorData);
                return `Error ${response.status}: ${errorData.error?.message ?? 'Unknown error'}`;
            }

            const data = await response.json();

            let messageContent = "";
            if (data.choices[0].message.content?.trim()) {
                messageContent = data.choices[0].message.content;
            } else if (data.choices[0].message.reasoning) {
                messageContent = data.choices[0].message.reasoning;
            } else {
                messageContent = "No se pudo obtener una respuesta válida.";
            }
            
            return messageContent;
        } catch (error) {
            console.error("Error fetching AI response:", error);
            return "Lo siento, ha ocurrido un error al procesar tu solicitud.";
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (input.trim() === "") return;
        
        const now = new Date();
        const dateString = now.toLocaleDateString();
        
        const userMessage: Message = {
            text: input,
            date: dateString,
            isUser: true
        };
        
        setMessages(prevMessages => [...prevMessages, userMessage]);
        const userInput = input;
        setInput("");
        
        const aiResponseText = await fetchAIResponse(userInput);
        
        const aiMessage: Message = {
            text: aiResponseText,
            date: new Date().toLocaleDateString(),
            isUser: false
        };
        
        setMessages(prevMessages => [...prevMessages, aiMessage]);
    };

    const cleanMarkdown = (text: string): string => {
        let cleanedText = text.replace(/\\boxed\{([\s\S]*?)\}/g, '$1');
        cleanedText = cleanedText.replace(/^```text\n([\s\S]*?)```$/g, '$1');
        return cleanedText;
    };

    return (
        <main className="min-h-screen flex-1 bg-white text-gray-800 flex flex-col">
        {/* Page Header */}
        <header className="bg-primary py-6 px-4 shadow-md flex items-center">
            <h1 className="text-2xl font-bold text-black text-center w-full">
                Chat with Our Travel Assistant!
            </h1>
        </header>
        {/* Chatbot Section */}
        <div className="flex-1 max-w-full mx-auto w-full p-8">
            <div className="overflow-y-auto h-[520px] p-4 bg-gray-100 rounded-lg w-full">
                {messages.map((msg, index) => (
                    <div 
                        key={index} 
                        className={`relative p-4 rounded-lg mb-4 ${
                            msg.isUser ? "bg-gray-200 ml-12" : "bg-blue-100 mr-12"
                        }`}
                    >
                        {msg.isUser ? (
                            <p className="whitespace-pre-wrap">{msg.text}</p>
                        ) : (
                            <div className="prose max-w-none">
                                <ReactMarkdown>
                                    {cleanMarkdown(msg.text)}
                                </ReactMarkdown>
                            </div>
                        )}
                        <span className="text-[0.7rem] absolute bottom-1 right-2">
                            {msg.date}
                        </span>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-center items-center p-4">
                        <div className="animate-pulse text-gray-500">Generating response...</div>
                    </div>
                )}
                {!apiKey && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
                        <strong className="font-bold">Configuration Error:</strong>
                        <span className="block sm:inline">DeepSeek API key not found. Please check your environment variables.</span>
                    </div>
                )}
            </div>
        </div>
        {/* Message Input */}
        <form onSubmit={handleSend} className="flex justify-center py-6">
            <div className="relative w-full mx-10">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message here..."
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    disabled={isLoading || !apiKey}
                />
                <button
                    type="submit"
                    disabled={isLoading || input.trim() === "" || !apiKey}
                    className="absolute right-2.5 bottom-2.5 text-blue-600 hover:text-blue-800 disabled:text-gray-400"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                    </svg>
                </button>
            </div>
        </form>
    </main>
    );
}


