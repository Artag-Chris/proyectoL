import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(req: Request) {
  const formData = await req.formData()
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const price = formData.get('price') as string
  const category = formData.get('category') as string
  const image = formData.get('image') as File

  if (!name || !description || !price || !category || !image) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filename = Date.now() + '-' + image.name
    const filepath = path.join(process.cwd(), 'public', 'uploads', filename)
    await writeFile(filepath, buffer)

    // Here you would typically save the product details to your database
    // For this example, we'll just return the product details
    return NextResponse.json({
      name,
      description,
      price,
      category,
      imageUrl: `/uploads/${filename}`
    })
  } catch (error) {
    console.error('Error saving product:', error)
    return NextResponse.json({ error: 'Error saving product' }, { status: 500 })
  }
}
