import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend('re_9vP9e8Pd_B7p1vSABrhG3qAzHoxvbkTzp')

export async function POST(request: Request) {
  try {
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
      to: ['germesmedium@gmail.com'],
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