'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const categories = [
  { id: 'bullying', label: 'Буллинг / травля', icon: '⚠️' },
  { id: 'cyberbullying', label: 'Кибербуллинг', icon: '💻' },
  { id: 'suspicious', label: 'Подозрительные публикации', icon: '🔍' },
  { id: 'terrorism', label: 'Терроризм и экстремизм', icon: '🚨' },
  { id: 'conflicts', label: 'Конфликты на межнациональной/межконфессиональной почве', icon: '⚔️' },
  { id: 'dangerous', label: 'Деструктивное, агрессивное или опасное поведение', icon: '⚡' },
  { id: 'threats', label: 'Угрозы в вузе / общежитии', icon: '🏫' },
  { id: 'other', label: 'Другое', icon: '📝' },
  { id: 'psychology', label: 'Психологическая помощь', icon: '🧠' },
]

const staff = [
  { name: 'Ратушинский Владислав Сергеевич', position: 'Директор', email: 'v.ratushinskij@narfu.ru' },
  { name: 'Савельева Надежда Валерьевна', position: 'Директор УМЦ', email: 'n.saveleva@narfu.ru' },
  { name: 'Лещук Лаурита Васильевна', position: 'Менеджер проектов', email: 'l.leshuk@narfu.ru' },
  { name: 'Кузнецова Юлия Сергеевна', position: 'Менеджер проектов', email: 'y.kuznetsova@narfu.ru' },
  { name: 'Кононова Анастасия Александровна', position: 'Медиаменеджер', email: 'a.kononova@narfu.ru' },
]

const emergencyContacts = [
  { number: '112', label: 'Экстренная помощь', description: 'Единый номер экстренных служб' },
  { number: '+7 (8182) 21-83-87', label: 'ФСБ', description: 'Управление ФСБ' },
  { number: '+7 (8182) 28-64-09', label: 'ФСБ', description: 'Управление ФСБ' },
  { number: '+7 (8182) 21-85-05', label: 'Психологическая помощь', description: 'Психологическая поддержка студентов' },
]

const legalInfo = [
  { title: 'Терроризм', description: 'Ответственность по ст. 205-206 УК РФ' },
  { title: 'Экстремизм', description: 'Ответственность по ст. 280-282 УК РФ' },
  { title: 'Ложные сообщения', description: 'Ответственность по ст. 207 УК РФ' },
  { title: 'Противоправные публикации', description: 'Ответственность по ст. 167, 213 УК РФ' },
]

const socialLinks = [
  { name: 'ВКонтакте', url: 'https://vk.com/koorcentr_narfu', icon: '/vk-icon.webp', isImage: true },
  { name: 'Max', url: 'https://max.ru/join/9VGOF4aYJee8tjzcdAWXtVBLNOcgLZ---SJyVemcGN4', icon: '/max-icon.jpg', isImage: true },
  { name: 'Сайт САФУ', url: 'https://narfu.ru', icon: '🌐', isImage: false },
]

const universities = [
  'САФУ (г. Архангельск)',
  'Высшая школа информационных технологий и автоматизированных систем',
  'Высшая инженерная школа',
  'Высшая школа энергетики, нефти и газа',
  'Высшая школа естественных наук и технологий',
  'Высшая школа психологии, педагогики и физической культуры',
  'Высшая школа социально-гуманитарных наук и международной коммуникации',
  'Высшая школа экономики, управления и права',
  'Высшая школа рыболовства и морских технологий',
  'Технологический колледж Императора Петра I',
  'Филиал в Северодвинске (Гуманитарный институт)',
  'Филиал в Северодвинске (ИСМАРТ)',
  'Филиал в Северодвинске (Технический колледж)',
  'Арктический морской институт',
  "ЧОУ ВО 'Институт управления'",
  'СГМУ (г. Архангельск)',
  'Другое',
]

const courses = ['1 курс', '2 курс', '3 курс', '4 курс', 'Магистратура']

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const [formData, setFormData] = useState({
    description: '',
    university: '',
    direction: '',
    course: '',
    location: '',
    contacts: '',
  })
  const [file, setFile] = useState<File | null>(null)
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === 'psychology') {
      window.location.href = 'tel:+78182218505'
      return
    }
    setSelectedCategory(categoryId)
    scrollToSection('report-form')
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!selectedCategory) {
      alert('Пожалуйста, выберите категорию обращения')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const submitData = new FormData()
      submitData.append('category', selectedCategory)
      submitData.append('description', formData.description)
      submitData.append('university', formData.university)
      submitData.append('direction', formData.direction)
      submitData.append('course', formData.course)
      submitData.append('location', formData.location)
      submitData.append('contacts', formData.contacts)
      if (file) {
        submitData.append('file', file)
      }

      const response = await fetch('/api/report', {
        method: 'POST',
        body: submitData,
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ description: '', university: '', direction: '', course: '', location: '', contacts: '' })
        setSelectedCategory('')
        setFile(null)
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50/40">
      <section className="bg-gradient-to-b from-safu-blue to-[#002a50] text-white py-20 lg:py-32">
        <div className="container-main">
          <div className="flex justify-between items-start gap-8">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Координационный центр по противодействию<br />
                идеологии терроризма и профилактике экстремизма<br />
                САФУ
              </h1>
              <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl">
                Безопасное пространство для своевременного сообщения о потенциальных угрозах, конфликтах и в образовательной среде
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  onClick={() => scrollToSection('report-form')}
                  className="btn-emergency text-base sm:text-lg px-8 py-6"
                >
                  <span>📢</span> Сообщить о проблеме
                </Button>
                <Button
                  onClick={() => scrollToSection('contacts')}
                  variant="outline"
                  className="border-white/30 bg-white/15 text-white hover:bg-white/25 hover:text-white text-base sm:text-lg px-8 py-6"
                >
                  <span>📞</span> Контакты и соцсети
                </Button>
              </div>
              <Alert className="max-w-3xl border-safu-red/40 bg-safu-red/15 text-white">
                <span className="text-safu-red font-bold">⚠️</span>
                <AlertTitle>Экстренное уведомление</AlertTitle>
                <AlertDescription className="text-gray-100">
                  Если вам известно о готовящемся/совершенном или совершаемом в данный момент преступлении,
                  в том числе теракте — немедленно звоните 112.
                </AlertDescription>
              </Alert>
            </div>
            <Image src="/center-logo.png" alt="Логотип центра" className="hidden lg:block rounded-xl bg-white/10 p-3" width={220} height={180} priority />
          </div>
        </div>
      </section>

      <section className="py-16 bg-safu-gray">
        <div className="container-main">
          <h2 className="section-title text-center">Выберите тип обращения</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Card
                key={cat.id}
                className="card text-left hover:-translate-y-0.5 hover:bg-safu-blue hover:text-white group transition-all duration-200 cursor-pointer"
                onClick={() => handleCategoryClick(cat.id)}
              >
                <CardContent className="p-0">
                  <span className="text-2xl mb-2 block">{cat.icon}</span>
                  <span className="font-medium">{cat.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="report-form" className="py-16">
        <div className="container-main">
          <h2 className="section-title text-center">Форма обращения</h2>
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="category" className="mb-2">Категория обращения</Label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger id="category" className="w-full bg-white border-slate-300">
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c.id !== 'psychology').map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description" className="mb-2">Описание ситуации</Label>
                <Textarea
                  id="description"
                  rows={5}
                  placeholder="Опишите ситуацию максимально подробно..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  className="resize-none bg-white border-slate-300"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="university" className="mb-2">Вуз / высшая школа</Label>
                  <Select
                    value={formData.university}
                    onValueChange={(value) => setFormData({ ...formData, university: value })}
                  >
                    <SelectTrigger id="university" className="w-full bg-white border-slate-300">
                      <SelectValue placeholder="Выберите вуз" />
                    </SelectTrigger>
                    <SelectContent>
                      {universities.map((item) => (
                        <SelectItem key={item} value={item}>{item}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="direction" className="mb-2">Направление</Label>
                  <Input
                    id="direction"
                    type="text"
                    placeholder="Например: Прикладная информатика"
                    value={formData.direction}
                    onChange={(e) => setFormData({ ...formData, direction: e.target.value })}
                    className="bg-white border-slate-300"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="course" className="mb-2">Курс</Label>
                  <Select
                    value={formData.course}
                    onValueChange={(value) => setFormData({ ...formData, course: value })}
                  >
                    <SelectTrigger id="course" className="w-full bg-white border-slate-300">
                      <SelectValue placeholder="Выберите курс" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((item) => (
                        <SelectItem key={item} value={item}>{item}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="location" className="mb-2">Место происшествия</Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="Укажите место"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                    className="bg-white border-slate-300"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="contacts" className="mb-2">Контакты (необязательно)</Label>
                <Input
                  id="contacts"
                  type="text"
                  placeholder="Телефон или email"
                  value={formData.contacts}
                  onChange={(e) => setFormData({ ...formData, contacts: e.target.value })}
                  className="bg-white border-slate-300"
                />
              </div>
              <div>
                <Label htmlFor="file" className="mb-2">Прикрепить файл / скриншот</Label>
                <Input
                  id="file"
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  accept="image/*,.pdf,.doc,.docx,.txt"
                  className="h-auto py-2 bg-white border-slate-300"
                />
                {file && <p className="text-sm text-gray-500 mt-1">Выбран: {file.name}</p>}
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-base py-6 bg-safu-blue text-white hover:bg-blue-800 disabled:bg-blue-300"
              >
                {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
              </Button>
              {submitStatus === 'success' && (
                <Alert className="border-emerald-200 bg-emerald-50">
                  <AlertTitle className="text-emerald-700">Готово</AlertTitle>
                  <AlertDescription className="text-emerald-700">Заявка успешно отправлена.</AlertDescription>
                </Alert>
              )}
              {submitStatus === 'error' && (
                <Alert variant="destructive" className="border-red-200 bg-red-50">
                  <AlertTitle>Ошибка отправки</AlertTitle>
                  <AlertDescription>Попробуйте еще раз немного позже.</AlertDescription>
                </Alert>
              )}
              <p className="text-sm text-gray-500 text-center">
                Информация передается в профильный центр. Цель обращения — профилактика.
              </p>
              <Alert className="bg-muted/50">
                <AlertTitle>Внимание</AlertTitle>
                <AlertDescription>
                  Данный сервис носит исключительно информационный характер, предназначен для оказания
                  возможной помощи студентам или учебным группам в конфликтных ситуациях.
                </AlertDescription>
                <AlertDescription>
                  Он не заменяет обращение в правоохранительные органы, особенно в случаях, не требующих
                  отлагательств, и не является способом сообщения о правонарушениях, преступлениях или угрозе
                  их совершения, в том числе при возникновении террористической угрозы.
                </AlertDescription>
              </Alert>
            </form>
          </div>
        </div>
      </section>

      <section className="py-16 bg-safu-gray">
        <div className="container-main">
          <h2 className="section-title text-center">Команда координационного центра</h2>
          <p className="text-center text-gray-600 mb-8">Ломоносова, 58, Архангельск | Тел: +7 (8182) 65-05-22</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {staff.map((person) => (
              <Card key={person.name} className="bg-white text-center">
                <CardContent className="pt-4">
                  <div className="w-20 h-20 bg-safu-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl text-white">{person.name.charAt(0)}</span>
                  </div>
                  <h3 className="font-bold text-safu-blue">{person.name}</h3>
                  <p className="text-gray-600 text-sm">{person.position}</p>
                  {person.email && <p className="text-safu-blue text-sm mt-2">{person.email}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16">
        <div className="container-main">
          <h2 className="section-title text-center">Официальные каналы связи</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white px-6 py-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 inline-flex items-center gap-3"
              >
                {link.isImage ? (
                  <Image src={link.icon} alt={link.name} width={24} height={24} />
                ) : (
                  <span className="text-2xl">{link.icon}</span>
                )}
                <span className="font-medium text-safu-blue">{link.name}</span>
              </a>
            ))}
          </div>
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-safu-blue mb-4 text-center">Последние новости</h3>
            <div className="flex justify-center overflow-hidden">
                <iframe
                  title="Новости ВКонтакте"
                  src="https://vk.com/widget_community.php?app=0&width=420px&_ver=1&gid=216086387&mode=4&color1=FFFFFF&color2=1F2937&color3=0066B3"
                  width="420"
                  height="480"
                  className="w-full max-w-[420px] bg-white"
                  loading="lazy"
                />
              </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-safu-blue text-white">
        <div className="container-main">
          <h2 className="section-title text-white text-center">Экстренные контакты</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergencyContacts.map((contact) => (
              <Card key={contact.number} className="bg-white/10 hover:bg-white/20 border-white/15 text-white">
                <CardContent className="pt-4">
                  <Badge variant="secondary" className="mb-2 bg-safu-red/90 text-white">{contact.label}</Badge>
                  <div className="text-3xl font-bold mb-2 text-safu-red">{contact.number}</div>
                  <div className="text-gray-200 text-sm">{contact.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-main">
          <h2 className="section-title text-center">Ответственность по законодательству РФ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {legalInfo.map((item) => (
              <Card key={item.title} className="card">
                <CardContent className="pt-4">
                  <h3 className="font-bold text-safu-blue mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-safu-blue text-white py-12">
        <div className="container-main">
          <div className="flex items-center gap-4 mb-8">
            <Image src="/logo.png" alt="Логотип САФУ" width={160} height={60} />
            <div>
              <div className="font-bold text-xl">Северный (Арктический) федеральный университет имени М.В. Ломоносова</div>
              <p className="text-gray-300 text-sm">Координационный центр</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <div className="space-y-2 text-gray-300 text-sm">
                <p>г. Архангельск, ул. Урицкого, 56</p>
                <p>Тел: +7 (8182) 21-85-00</p>
                <p>Email: info@narfu.ru</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Координационный центр</h4>
              <div className="space-y-2 text-gray-300 text-sm">
                <p>Тел: +7 (8182) 21-85-01</p>
                <p>Email: safety@narfu.ru</p>
                <p>Техническая поддержка: t.spirin@narfu.ru</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2024 Координационный центр по противодействию идеологии терроризма и профилактике экстремизма САФУ. Все права защищены.
          </div>
        </div>
      </footer>
    </main>
  )
}