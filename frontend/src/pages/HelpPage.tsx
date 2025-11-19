import { Layout } from "@/components/layout/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, Mail, Book, MessageCircle, Phone } from "lucide-react";

export function HelpPage() {
  const faqs = [
    {
      question: "How do I reset my password?",
      answer:
        "You can reset your password by going to the Settings page and clicking on the 'Security' tab. From there, you'll see an option to change your password.",
    },
    {
      question: "How do I export reports?",
      answer:
        "To export reports, navigate to the Dashboard page and look for the 'Export' button in the top right corner of the report widget.",
    },
    {
      question: "Can I change my username?",
      answer:
        "Currently, usernames are fixed. If you need to change your display name, please contact support.",
    },
    {
      question: "Where can I find the API documentation?",
      answer:
        "API documentation is available in the 'Internal Use' section under the 'Resources' tab.",
    },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">
            How can we help you?
          </h1>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search for help articles..."
              className="pl-10 h-12 text-lg bg-white shadow-sm"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow text-center space-y-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Book className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg">Documentation</h3>
            <p className="text-gray-500 text-sm">
              Detailed guides and articles to help you get the most out of our
              platform.
            </p>
            <Button variant="outline" className="w-full">
              Browse Guides
            </Button>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow text-center space-y-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg">Community Forum</h3>
            <p className="text-gray-500 text-sm">
              Join the conversation, ask questions, and share ideas with other
              users.
            </p>
            <Button variant="outline" className="w-full">
              Visit Forum
            </Button>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow text-center space-y-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
              <Phone className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg">Contact Support</h3>
            <p className="text-gray-500 text-sm">
              Can't find what you're looking for? Our support team is here to
              help.
            </p>
            <Button variant="outline" className="w-full">
              Contact Us
            </Button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Form Section */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Still need help?</h2>
              <p className="text-gray-600">
                Send us a message and we'll get back to you as soon as possible.
              </p>
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="w-5 h-5" />
                <span>support@saletics.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="w-5 h-5" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input placeholder="john@example.com" type="email" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  placeholder="Describe your issue..."
                  className="min-h-[120px]"
                />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
