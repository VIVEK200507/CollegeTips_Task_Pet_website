"use client"

import Link from "next/link"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  interests: z.array(z.string()).min(1, {
    message: "Please select at least one area of interest.",
  }),
  availability: z.string({
    required_error: "Please select your availability.",
  }),
  experience: z.string().optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
})

export default function VolunteerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      interests: [],
      availability: "",
      experience: "",
      agreeToTerms: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    form.reset()

    toast({
      title: "Volunteer application submitted!",
      description: "Thank you for your interest in helping our furry friends. We'll be in touch soon!",
    })
  }

  const interestOptions = [
    { id: "event-planning", label: "Event Planning" },
    { id: "animal-care", label: "Animal Care" },
    { id: "social-media", label: "Social Media" },
    { id: "fundraising", label: "Fundraising" },
    { id: "education", label: "Education & Outreach" },
  ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="(123) 456-7890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="interests"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>Areas of Interest</FormLabel>
                  <FormDescription>Select all that apply</FormDescription>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {interestOptions.map((option) => (
                    <FormField
                      key={option.id}
                      control={form.control}
                      name="interests"
                      render={({ field }) => {
                        return (
                          <FormItem key={option.id} className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(option.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, option.id])
                                    : field.onChange(field.value?.filter((value) => value !== option.id))
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">{option.label}</FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Availability</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your availability" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="weekdays">Weekdays</SelectItem>
                    <SelectItem value="weekends">Weekends</SelectItem>
                    <SelectItem value="evenings">Evenings</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Previous Experience (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about any relevant experience you have..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agreeToTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>I agree to the terms and conditions</FormLabel>
                  <FormDescription>
                    You can read our terms and conditions{" "}
                    <Link href="#" className="text-amber-600 hover:underline">
                      here
                    </Link>
                    .
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </Form>
    </motion.div>
  )
}
