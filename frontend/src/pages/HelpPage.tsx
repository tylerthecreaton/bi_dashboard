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
import { motion } from "framer-motion";

export function HelpPage() {
  const faqs = [
    {
      question: "ฉันจะรีเซ็ตรหัสผ่านได้อย่างไร?",
      answer:
        "คุณสามารถรีเซ็ตรหัสผ่านได้โดยไปที่หน้าการตั้งค่าและคลิกที่แท็บ 'ความปลอดภัย' จากนั้นคุณจะเห็นตัวเลือกในการเปลี่ยนรหัสผ่าน",
    },
    {
      question: "ฉันจะส่งออกรายงานได้อย่างไร?",
      answer:
        "หากต้องการส่งออกรายงาน ให้ไปที่หน้าแดชบอร์ดและมองหาปุ่ม 'ส่งออก' ที่มุมขวาบนของวิดเจ็ตรายงาน",
    },
    {
      question: "ฉันสามารถเปลี่ยนชื่อผู้ใช้ได้หรือไม่?",
      answer:
        "ในปัจจุบัน ชื่อผู้ใช้ถูกกำหนดไว้คงที่ หากคุณต้องการเปลี่ยนชื่อที่แสดง โปรดติดต่อฝ่ายสนับสนุน",
    },
    {
      question: "ฉันสามารถค้นหาเอกสาร API ได้ที่ไหน?",
      answer:
        "เอกสาร API มีให้ใช้งานในส่วน 'การใช้งานภายใน' ภายใต้แท็บ 'ทรัพยากร'",
    },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <motion.div
          className="text-center space-y-4 py-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900">
            เราจะช่วยคุณอย่างไร?
          </h1>
          <motion.div
            className="relative max-w-xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="ค้นหาบทความช่วยเหลือ..."
              className="pl-10 h-12 text-lg bg-white shadow-sm"
            />
          </motion.div>
        </motion.div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -5 }}
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Book className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg">เอกสารประกอบ</h3>
            <p className="text-gray-500 text-sm">
              คู่มือและบทความโดยละเอียดเพื่อช่วยให้คุณใช้งานแพลตฟอร์มของเราได้อย่างเต็มประสิทธิภาพ
            </p>
            <Button variant="outline" className="w-full">
              เรียกดูคู่มือ
            </Button>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ y: -5 }}
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg">ฟอรัมชุมชน</h3>
            <p className="text-gray-500 text-sm">
              เข้าร่วมการสนทนา ถามคำถาม และแชร์ไอเดียกับผู้ใช้รายอื่น
            </p>
            <Button variant="outline" className="w-full">
              เยี่ยมชมฟอรัม
            </Button>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
              <Phone className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg">ติดต่อฝ่ายสนับสนุน</h3>
            <p className="text-gray-500 text-sm">
              หาไม่พบสิ่งที่คุณกำลังมองหาหรือไม่? ทีมสนับสนุนของเราพร้อมช่วยเหลือคุณ
            </p>
            <Button variant="outline" className="w-full">
              ติดต่อเรา
            </Button>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6">
            คำถามที่พบบ่อย
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Contact Form Section */}
        <motion.div
          className="bg-gray-50 rounded-xl border border-gray-200 p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <h2 className="text-2xl font-bold">ยังต้องการความช่วยเหลืออยู่หรือไม่?</h2>
              <p className="text-gray-600">
                ส่งข้อความถึงเราและเราจะติดต่อกลับโดยเร็วที่สุด
              </p>
              <motion.div
                className="flex items-center gap-3 text-gray-600"
                whileHover={{ scale: 1.05 }}
              >
                <Mail className="w-5 h-5" />
                <span>support@saletics.com</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-3 text-gray-600"
                whileHover={{ scale: 1.05 }}
              >
                <Phone className="w-5 h-5" />
                <span>+1 (555) 123-4567</span>
              </motion.div>
            </motion.div>
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">ชื่อ</label>
                  <Input placeholder="สมชาย" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">นามสกุล</label>
                  <Input placeholder="ใจดี" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">อีเมล</label>
                <Input placeholder="somchai@example.com" type="email" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">ข้อความ</label>
                <Textarea
                  placeholder="อธิบายปัญหาของคุณ..."
                  className="min-h-[120px]"
                />
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  ส่งข้อความ
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
