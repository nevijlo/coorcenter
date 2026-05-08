import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

export async function POST(request: Request) {
  try {
    if (!resend) {
      return NextResponse.json(
        { success: false, error: 'Server is not configured: RESEND_API_KEY is missing' },
        { status: 500 },
      )
    }

    const formData = await request.formData()
    
    const category = formData.get('category') as string
    const description = formData.get('description') as string
    const university = formData.get('university') as string
    const direction = formData.get('direction') as string
    const course = formData.get('course') as string
    const location = formData.get('location') as string
    const contacts = formData.get('contacts') as string
    const file = formData.get('file') as File | null

    const categoryLabels: Record<string, string> = {
      bullying: 'Буллинг / травля',
      cyberbullying: 'Кибербуллинг',
      suspicious: 'Подозрительные публикации',
      terrorism: 'Терроризм и экстремизм',
      conflicts: 'Конфликты на межнациональной/межконфессиональной почве',
      dangerous: 'Деструктивное, агрессивное или опасное поведение',
      threats: 'Угрозы в вузе / общежитии',
      other: 'Другое',
    }

    const emailContent = `
Новое обращение на Координационный центр САФУ

Категория: ${categoryLabels[category] || category}
Описание: ${description}
Вуз: ${university}
Направление: ${direction}
Курс: ${course}
Место: ${location}
Контакты: ${contacts || 'не указаны'}
    `.trim()

    const attachments = []
    if (file) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      attachments.push({
        filename: file.name,
        content: buffer.toString('base64'),
        contentType: file.type,
      })
    }

    const data = await resend.emails.send({
      from: 'Koordinator <onboarding@resend.dev>',
      to: ['v.ratushinskij@narfu.ru'],
      subject: `Обращение: ${categoryLabels[category] || category}`,
      text: emailContent,
      attachments,
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}