"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Send, X, PawPrint, User } from "lucide-react"

// Sample chatbot responses
const botResponses = [
  {
    trigger: ["hello", "hi", "hey"],
    response: "Hello there! I'm PawBuddy, your pet-friendly city guide. How can I help you today?",
  },
  {
    trigger: ["volunteer", "help", "assist"],
    response:
      "We'd love your help! You can volunteer by filling out the form on our website. We need help with events, animal care, and outreach programs.",
  },
  {
    trigger: ["adopt", "adoption", "pet"],
    response:
      "Looking to adopt? That's wonderful! We have many loving animals looking for forever homes. Check out our adoption carousel to see some of our available pets.",
  },
  {
    trigger: ["event", "events"],
    response:
      "We host regular events including adoption fairs, fundraisers, and educational workshops. Our next event is the Spring Adoption Fair on May 15th at Central Park.",
  },
  {
    trigger: ["donate", "donation", "support"],
    response:
      "Thank you for considering a donation! Your support helps us create more pet-friendly spaces and rescue animals in need. You can donate through our website or at any of our events.",
  },
]

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatbotIntegration() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm PawBuddy, your friendly assistant. How can I help you with pet-related questions today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate bot thinking
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getBotResponse(input),
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const getBotResponse = (userInput: string) => {
    const lowercaseInput = userInput.toLowerCase()

    // Check for matching triggers
    for (const item of botResponses) {
      if (item.trigger.some((trigger) => lowercaseInput.includes(trigger))) {
        return item.response
      }
    }

    // Default response if no triggers match
    return "I'm not sure how to help with that specific question. Would you like to know about volunteering, adoption, events, or making a donation?"
  }

  return (
    <>
      {/* Chatbot toggle button */}
      <motion.button
        className="fixed bottom-6 right-6 bg-amber-600 text-white rounded-full p-4 shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>

      {/* Chatbot dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 w-80 sm:w-96"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <Card className="border-amber-200 shadow-xl">
              <CardHeader className="bg-amber-600 text-white rounded-t-lg flex flex-row justify-between items-center p-4">
                <div className="flex items-center gap-2">
                  <PawPrint className="h-5 w-5" />
                  <CardTitle className="text-lg">PawBuddy</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-amber-700 rounded-full h-8 w-8"
                >
                  <X className="h-5 w-5" />
                </Button>
              </CardHeader>

              <CardContent className="p-0">
                <div className="h-80 overflow-y-auto p-4 bg-amber-50">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={`flex mb-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === "user"
                            ? "bg-amber-600 text-white rounded-tr-none"
                            : "bg-white border border-amber-200 rounded-tl-none"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {message.sender === "bot" ? (
                            <PawPrint className="h-4 w-4 text-amber-600" />
                          ) : (
                            <User className="h-4 w-4 text-white" />
                          )}
                          <span
                            className={`text-xs ${message.sender === "user" ? "text-amber-100" : "text-amber-600"}`}
                          >
                            {message.sender === "user" ? "You" : "PawBuddy"}
                          </span>
                        </div>
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      className="flex mb-4 justify-start"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="max-w-[80%] p-3 rounded-lg bg-white border border-amber-200 rounded-tl-none">
                        <div className="flex items-center gap-2 mb-1">
                          <PawPrint className="h-4 w-4 text-amber-600" />
                          <span className="text-xs text-amber-600">PawBuddy</span>
                        </div>
                        <div className="flex gap-1">
                          <motion.div
                            className="w-2 h-2 bg-amber-300 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, delay: 0 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-amber-400 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, delay: 0.2 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-amber-500 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, delay: 0.4 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </CardContent>

              <CardFooter className="p-3 border-t border-amber-100">
                <form
                  className="flex w-full gap-2"
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSendMessage()
                  }}
                >
                  <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="border-amber-200 focus-visible:ring-amber-500"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="bg-amber-600 hover:bg-amber-700"
                    disabled={!input.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
