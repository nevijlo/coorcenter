'use client'

import { useState } from 'react'

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
  { name: 'Ратушинский Владислав Сергеевич', position: 'Директор', email: '' },
  { name: 'Савельева Надежда Валерьевна', position: 'Директор УМЦ', email: 'n.saveleva@narfu.ru' },
  { name: 'Лещук Лаурита Васильевна', position: 'Менеджер проектов', email: 'l.leshuk@narfu.ru' },
  { name: 'Кузнецова Юлия Сергеевна', position: 'Менеджер проектов', email: 'y.kuznetsova@narfu.ru' },
  { name: 'Настя Кононова', position: 'Медиаменеджер', email: 'a.kononova@narfu.ru' },
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

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === 'psychology') {
      window.location.href = 'tel:+78182218505'
      return
    }
    setSelectedCategory(categoryId)
    document.getElementById('report-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async () => {
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
    <main className="min-h-screen">
      <section className="bg-gradient-to-b from-safu-blue to-[#002a50] text-white py-20 lg:py-32">
        <div className="container-main">
          <div className="flex justify-between items-start">
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
                <button
                  onClick={() => document.getElementById('report-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-emergency text-lg px-8 py-4 inline-flex items-center justify-center gap-2"
                >
                  <span>📢</span> Сообщить о проблеме
                </button>
                <button
                  onClick={() => document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white/10 hover:bg-white/20 text-white text-lg px-8 py-4 rounded-lg font-medium transition-all duration-200 inline-flex items-center justify-center gap-2"
                >
                  <span>📞</span> Контакты и соцсети
                </button>
              </div>
              <div className="bg-safu-red/20 border border-safu-red/30 rounded-lg p-4 inline-flex items-center gap-3">
                <span className="text-safu-red font-bold">⚠️</span>
                <span>Если вам известно о готовящемся/совершенном или совершаемом в данный момент преступлении, в том числе теракте — немедленно звоните 112</span>
              </div>
            </div>
            <img src="/center-logo.png" alt="Логотип центра" className="hidden lg:block" style={{ height: '180px', width: 'auto' }} />
          </div>
        </div>
      </section>

      <section className="py-16 bg-safu-gray">
        <div className="container-main">
          <h2 className="section-title text-center">Выберите тип обращения</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="card text-left hover:bg-safu-blue hover:text-white group transition-all duration-200"
              >
                <span className="text-2xl mb-2 block">{cat.icon}</span>
                <span className="font-medium">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="report-form" className="py-16">
        <div className="container-main">
          <h2 className="section-title text-center">Форма обращения</h2>
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Категория обращения</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-safu-blue focus:border-transparent"
                >
                  <option value="">Выберите категорию</option>
                  {categories.filter(c => c.id !== 'psychology').map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Описание ситуации</label>
                <textarea
                  rows={5}
                  placeholder="Опишите ситуацию максимально подробно..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-safu-blue focus:border-transparent resize-none"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Вуз / высшая школа</label>
                  <select
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-safu-blue focus:border-transparent"
                  >
                    <option value="">Выберите вуз</option>
                    <option>САФУ (г. Архангельск)</option>
                    <option>Высшая школа информационных технологий и автоматизированных систем</option>
                    <option>Высшая инженерная школа</option>
                    <option>Высшая школа энергетики, нефти и газа</option>
                    <option>Высшая школа естественных наук и технологий</option>
                    <option>Высшая школа психологии, педагогики и физической культуры</option>
                    <option>Высшая школа социально-гуманитарных наук и международной коммуникации</option>
                    <option>Высшая школа экономики, управления и права</option>
                    <option>Высшая школа рыболовства и морских технологий</option>
                    <option>Технологический колледж Императора Петра I</option>
                    <option>Филиал в Северодвинске</option>
                    <option>Филиал в На��ья��-Маре</option>
                    <option>СГМУ (г. Архангельск)</option>
                    <option>Другое</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Направление</label>
                  <input
                    type="text"
                    placeholder="Например: Прикладная информатика"
                    value={formData.direction}
                    onChange={(e) => setFormData({ ...formData, direction: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-safu-blue focus:border-transparent"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Курс</label>
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-safu-blue focus:border-transparent"
                  >
                    <option value="">Выберите курс</option>
                    <option>1 курс</option>
                    <option>2 курс</option>
                    <option>3 курс</option>
                    <option>4 курс</option>
                    <option>Магистратура</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Место происшествия</label>
                  <input
                    type="text"
                    placeholder="Укажите место"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-safu-blue focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Контакты (необязательно)</label>
                <input
                  type="text"
                  placeholder="Телефон или email"
                  value={formData.contacts}
                  onChange={(e) => setFormData({ ...formData, contacts: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-safu-blue focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Прикрепить файл / скриншот</label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  accept="image/*,.pdf,.doc,.docx,.txt"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-safu-blue focus:border-transparent"
                />
                {file && <p className="text-sm text-gray-500 mt-1">Выбран: {file.name}</p>}
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
              </button>
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-100 text-green-800 rounded-lg text-center">Заявка успешно отправлена!</div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-100 text-red-800 rounded-lg text-center">Ошибка при отправке. Попробуйте позже.</div>
              )}
              <p className="text-sm text-gray-500 text-center">
                Информация передается в профильный центр. Цель обращения — профилактика.
              </p>
              <div className="mt-4 p-4 bg-gray-100 rounded-lg text-sm text-gray-600">
                <p className="mb-2"><strong>Внимание:</strong> Данный сервис носит исключительно информационный характер, предназначен для оказания возможной помощи студентам или учебным группам в конфликтных ситуациях.</p>
                <p>Он не заменяет обращение в правоохранительные органы, особенно в случаях, не требующих отлагательств, и не является способом сообщения о правонарушениях, преступлениях или угрозе их совершения, в том числе при возникновении террористической угрозы.</p>
              </div>
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
              <div key={person.name} className="bg-white rounded-lg p-6 shadow-sm text-center">
                <div className="w-20 h-20 bg-safu-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl text-white">{person.name.charAt(0)}</span>
                </div>
                <h3 className="font-bold text-safu-blue">{person.name}</h3>
                <p className="text-gray-600 text-sm">{person.position}</p>
                {person.email && <p className="text-safu-blue text-sm mt-2">{person.email}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16">
        <div className="container-main">
          <h2 className="section-title text-center">Официальные каналы связи</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white px-6 py-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 inline-flex items-center gap-3"
              >
                {link.isImage ? (
                  <img src={link.icon} alt={link.name} style={{ height: '24px', width: 'auto' }} />
                ) : (
                  <span className="text-2xl">{link.icon}</span>
                )}
                <span className="font-medium text-safu-blue">{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-safu-blue text-white">
        <div className="container-main">
          <h2 className="section-title text-white text-center">Экстренные контакты</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergencyContacts.map((contact) => (
              <div key={contact.label} className="bg-white/10 hover:bg-white/20 rounded-lg p-6 transition-all duration-200">
                <div className="text-3xl font-bold mb-2 text-safu-red">{contact.number}</div>
                <div className="font-medium text-lg mb-1">{contact.label}</div>
                <div className="text-gray-300 text-sm">{contact.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-main">
          <h2 className="section-title text-center">Ответственность по законодательству РФ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {legalInfo.map((item) => (
              <div key={item.title} className="card">
                <h3 className="font-bold text-safu-blue mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-safu-blue text-white py-12">
        <div className="container-main">
          <div className="flex items-center gap-4 mb-8">
            <img src="/logo.png" alt="Логотип САФУ" style={{ height: '60px', width: 'auto' }} />
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