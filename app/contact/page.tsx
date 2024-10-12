'use client'

import React, { useState } from 'react'
import { Loader2, Send, CheckCircle } from 'lucide-react'

interface FormData {
    name: string
    email: string
    message: string
}

export default function ContactPage() {
    const [result, setResult] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSuccess, setIsSuccess] = useState<boolean>(false)

    const onSubmit = async (event: any) => {
        event.preventDefault()
        setIsLoading(true)
        setResult('Sending....')
        const formData = new FormData(event.target)

        const accessKey = process.env.NEXT_PUBLIC_ACCESS_KEY;

        if (accessKey) {
            formData.append('access_key', accessKey);
        } else {
            console.error('Access key is not defined');
            setResult('Access key is not defined. Please try again later.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
            })

            const data = await response.json()

            if (data.success) {
                setResult('Message Sent Successfully')
                setIsSuccess(true)
                event.target.reset()
            } else {
                console.error('Error', data)
                setResult(data.message)
                setIsSuccess(false)
            }
        } catch (error) {
            console.error('Error', error)
            setResult('An error occurred. Please try again.')
            setIsSuccess(false)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 pt-[60px]">
            <div className="max-w-4xl w-full bg-base-100 shadow-xl rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 p-8 bg-success text-success-content">
                        <h2 className="text-3xl font-bold mb-4 md:text-5xl md:my-4">Contact Us</h2>
                        <p className="mb-4">We'd love to hear from you! Reach out for reservations, inquiries, or just to say hello.</p>
                        <div className="space-y-2">
                            <p className="flex items-center"><CheckCircle className="mr-2" /> 24/7 Customer Support</p>
                            <p className="flex items-center"><CheckCircle className="mr-2" /> Luxury Accommodations</p>
                            <p className="flex items-center"><CheckCircle className="mr-2" /> Exclusive Offers</p>
                        </div>
                    </div>
                    <div className="md:w-1/2 p-8">
                        <form onSubmit={onSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="input input-bordered w-full"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="input input-bordered w-full"
                                    placeholder="johndoe@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="label">
                                    <span className="label-text">Message</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    className="textarea textarea-bordered w-full h-32"
                                    placeholder="Your message here..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className={`btn btn-success w-full ${isLoading ? 'loading' : ''}`}
                                disabled={isLoading}
                            >
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                                {isLoading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                        {result && (
                            <div className={`mt-4 text-center ${isSuccess ? 'text-success' : 'text-error'}`}>
                                {result}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}