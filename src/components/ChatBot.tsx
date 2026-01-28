'use client'

import { useState, useRef, useEffect } from 'react'
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi'

interface Message {
    id: string
    text: string
    sender: 'user' | 'bot'
    timestamp: Date
}

// Chatbot knowledge base
const chatbotResponses: Record<string, string> = {
    hola: '¡Hola! Bienvenido a Perlawasi. Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?',
    ubicacion: 'Estamos ubicados en Segunda Jerusalén - Rioja, San Martín, Perú. Somos un destino turístico muy visitado a nivel nacional.',
    horario: 'Nuestro horario de atención es de lunes a domingo de 8:00 AM a 10:00 PM.',
    restaurante: 'Nuestro restaurante ofrece una experiencia gastronómica única con productos de kilómetro cero. Trabajamos con ingredientes frescos de nuestra propia huerta.',
    heladeria: 'Nuestra heladería ofrece sabores artesanales únicos preparados con ingredientes orgánicos y naturales.',
    alojamiento: 'Ofrecemos alojamiento de lujo en el corazón de la naturaleza. Contamos con suites panorámicas y cabañas rústicas con todas las comodidades.',
    'cafe-cacao': 'Nuestra sección de Café & Cacao combina lo mejor de ambos mundos: café de especialidad cultivado en las alturas y chocolates artesanales elaborados con cacao ancestral de San Martín.',
    cerveceria: 'Nuestra cervecería artesanal produce cervezas únicas con sabores inspirados en las montañas, utilizando agua pura de manantial.',
    licoreria: 'Nuestra licorería de autor ofrece destilados premium y macerados artesanales que capturan la esencia de nuestra biodiversidad.',
    plantas: 'Nuestro vivero ofrece plantas nativas y decorativas, perfectas para tu hogar o jardín.',
    ropa: 'Nuestra boutique ofrece ropa artesanal inspirada en la naturaleza, con prendas tejidas a mano con lana de alpaca.',
    reserva: 'Para hacer una reserva, puedes llamarnos al +51 928 141 669 o escribirnos por WhatsApp. También puedes reservar directamente en nuestra página web.',
    pago: 'Aceptamos pagos con tarjeta de crédito, débito y billetera digital a través de Mercado Pago. También aceptamos efectivo.',
    operadores: 'Trabajamos con más de 60 operadores turísticos a nivel nacional. Somos un destino reconocido en la región.',
    azunga: 'Somos parte de la comunidad Azunga, personas oriundas del lugar. Nos identificamos con nuestra herencia y cultura nativa.',
    default: 'Gracias por tu pregunta. Para información más específica, te recomiendo contactarnos por WhatsApp al +51 928 141 669 o visitar nuestras diferentes secciones en la página web.',
}

const quickQuestions = [
    '¿Dónde están ubicados?',
    '¿Qué servicios ofrecen?',
    '¿Cómo hago una reserva?',
    '¿Cuál es el horario?',
]

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: '¡Hola! Soy el asistente virtual de Perlawasi. ¿En qué puedo ayudarte hoy?',
            sender: 'bot',
            timestamp: new Date(),
        },
    ])
    const [inputValue, setInputValue] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const getBotResponse = (userMessage: string): string => {
        const lowerMessage = userMessage.toLowerCase()

        // Check for keywords in the message
        for (const [keyword, response] of Object.entries(chatbotResponses)) {
            if (lowerMessage.includes(keyword)) {
                return response
            }
        }

        return chatbotResponses.default
    }

    const handleSendMessage = (text?: string) => {
        const messageText = text || inputValue.trim()

        if (!messageText) return

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            text: messageText,
            sender: 'user',
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])
        setInputValue('')

        // Simulate bot thinking and response
        setTimeout(() => {
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: getBotResponse(messageText),
                sender: 'bot',
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, botResponse])
        }, 500)
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    return (
        <>
            {/* Chat Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 left-6 z-40 w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
                    aria-label="Abrir chat"
                >
                    <FiMessageCircle className="w-8 h-8 text-white" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />

                    {/* Tooltip */}
                    <div className="absolute left-full ml-3 bg-gray-900 text-white px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        ¿Tienes preguntas? Chatea con nosotros
                    </div>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 left-6 z-40 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col animate-scale-in">
                    {/* Header */}
                    <div className="bg-primary-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary-500 font-bold">
                                P
                            </div>
                            <div>
                                <h3 className="font-semibold">Asistente Perlawasi</h3>
                                <p className="text-xs text-primary-100">En línea</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-primary-600 rounded-full transition-colors"
                            aria-label="Cerrar chat"
                        >
                            <FiX className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] px-4 py-2 rounded-2xl ${message.sender === 'user'
                                        ? 'bg-primary-500 text-white rounded-br-none'
                                        : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                                        }`}
                                >
                                    <p className="text-sm">{message.text}</p>
                                    <p
                                        className={`text-xs mt-1 ${message.sender === 'user' ? 'text-primary-100' : 'text-gray-500'
                                            }`}
                                    >
                                        {message.timestamp.toLocaleTimeString('es-PE', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Questions */}
                    {messages.length <= 2 && (
                        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
                            <p className="text-xs text-gray-600 mb-2">Preguntas frecuentes:</p>
                            <div className="flex flex-wrap gap-2">
                                {quickQuestions.map((question, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSendMessage(question)}
                                        className="text-xs px-3 py-1.5 bg-white border border-gray-300 rounded-full hover:bg-primary-50 hover:border-primary-500 transition-colors"
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input */}
                    <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Escribe tu mensaje..."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                            />
                            <button
                                onClick={() => handleSendMessage()}
                                disabled={!inputValue.trim()}
                                className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Enviar mensaje"
                            >
                                <FiSend className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
