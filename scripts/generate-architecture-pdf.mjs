import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const publicDocsDir = path.join(repoRoot, 'public', 'docs')
const brandDir = path.join(repoRoot, 'public', 'brand')
const outputPath = path.join(publicDocsDir, 'anclora-group-access-architecture-v1.pdf')

const architectureGroups = [
  {
    eyebrow: 'Capa de entrada',
    title: 'Relación y puerta de acceso',
    body: 'Las superficies que definen la entrada premium al ecosistema, la activación de partners y el marco corporativo de visibilidad.',
    accent: ['#d1a847', '#79d9d6'],
    apps: [
      {
        title: 'Anclora Private Estates',
        eyebrow: 'Real estate de lujo',
        description: 'Puerta premium del vertical inmobiliario y superficie externa principal del ecosistema.',
        logo: 'logo-anclora-private-estates.webp',
      },
      {
        title: 'Anclora Synergi',
        eyebrow: 'Plataforma de partnership',
        description: 'Admisión, activación y colaboración privada con partners aprobados bajo una narrativa selectiva.',
        logo: 'logo-anclora-synergi.webp',
      },
    ],
  },
  {
    eyebrow: 'Capa operativa',
    title: 'Inteligencia y coordinación',
    body: 'El núcleo donde la inteligencia territorial, la coordinación interna y la lectura ejecutiva del ecosistema se vuelven operables.',
    accent: ['#56bdd0', '#7f80ff'],
    apps: [
      {
        title: 'Anclora Data Lab',
        eyebrow: 'Plataforma de inteligencia',
        description: 'Señales territoriales, documentación curada e inteligencia premium para perfiles autorizados.',
        logo: 'logo-anclora-datalab.webp',
      },
      {
        title: 'Anclora Nexus',
        eyebrow: 'Operación Private Estates',
        description: 'Pipeline comercial, relaciones y coordinación interna para la ejecución operativa del vertical premium.',
        logo: 'logo-anclora-nexus.webp',
      },
      {
        title: 'Anclora Command Center',
        eyebrow: 'Centro de mando',
        description: 'Lectura ejecutiva del ecosistema conectada a la bóveda, a decisiones clave y al foco territorial.',
        logo: 'logo-anclora-command-center.webp',
      },
    ],
  },
  {
    eyebrow: 'Capa de activación',
    title: 'Contenido, asesoría y crecimiento',
    body: 'Las aplicaciones que convierten la inteligencia en contenido, apoyo experto y crecimiento comercial sostenido.',
    accent: ['#c589ff', '#f2c35d'],
    apps: [
      {
        title: 'Anclora Content Generator AI',
        eyebrow: 'Motor editorial con IA',
        description: 'Producción asistida de contenidos y materiales de activación para activos premium y partnership.',
        logo: 'logo-content-generator-ai.webp',
      },
      {
        title: 'Anclora Advisor AI',
        eyebrow: 'Asesoría con IA',
        description: 'Asistencia estratégica y consultiva para escenarios fiscales, laborales y de mercado inmobiliario.',
        logo: 'logo-anclora-advisor-ai.webp',
      },
      {
        title: 'Anclora Impulso',
        eyebrow: 'Fitness y nutrición',
        description: 'Capa de crecimiento y activación enfocada en bienestar, empuje comercial y disciplina operativa.',
        logo: 'logo-anclora-impulso.webp',
      },
    ],
  },
]

function hexToRgb(hex) {
  const normalized = hex.replace('#', '')
  const safeHex = normalized.length === 3
    ? normalized.split('').map((char) => char + char).join('')
    : normalized

  const red = parseInt(safeHex.slice(0, 2), 16) / 255
  const green = parseInt(safeHex.slice(2, 4), 16) / 255
  const blue = parseInt(safeHex.slice(4, 6), 16) / 255
  return rgb(red, green, blue)
}

function drawBackground(page, primary, secondary) {
  const { width, height } = page.getSize()
  page.drawRectangle({ x: 0, y: 0, width, height, color: rgb(0.06, 0.09, 0.14) })
  page.drawCircle({ x: 120, y: height - 110, size: 220, color: primary, opacity: 0.1 })
  page.drawCircle({ x: width - 70, y: 110, size: 240, color: secondary, opacity: 0.08 })
}

async function drawLogo(pdfDoc, page, fileName, x, y, maxWidth, maxHeight) {
  const filePath = path.join(brandDir, fileName)
  const imageBytes = await sharp(filePath)
    .resize({ width: 160, height: 160, fit: 'inside' })
    .png()
    .toBuffer()
  const image = await pdfDoc.embedPng(imageBytes)
  const ratio = Math.min(maxWidth / image.width, maxHeight / image.height)
  const width = image.width * ratio
  const height = image.height * ratio

  page.drawImage(image, {
    x: x + (maxWidth - width) / 2,
    y: y + (maxHeight - height) / 2,
    width,
    height,
  })
}

async function buildPdf() {
  fs.mkdirSync(publicDocsDir, { recursive: true })

  const pdfDoc = await PDFDocument.create()
  pdfDoc.setTitle('Anclora Group Access Architecture v1')
  pdfDoc.setAuthor('Codex')
  pdfDoc.setCreator('Codex + pdf-lib')
  pdfDoc.setProducer('pdf-lib')
  pdfDoc.setSubject('Arquitectura de acceso de Anclora Group')

  const serif = await pdfDoc.embedFont(StandardFonts.TimesRomanBold)
  const sans = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const sansBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  const cover = pdfDoc.addPage([1190, 842])
  drawBackground(cover, hexToRgb('#7f80ff'), hexToRgb('#79d9d6'))

  cover.drawRectangle({
    x: 72,
    y: 72,
    width: 1046,
    height: 698,
    color: rgb(0.09, 0.13, 0.18),
    opacity: 0.9,
    borderColor: rgb(0.21, 0.29, 0.38),
    borderWidth: 1,
  })

  cover.drawText('ANCLORA GROUP', {
    x: 112,
    y: 690,
    size: 17,
    font: sansBold,
    color: rgb(0.89, 0.84, 0.73),
  })

  cover.drawText('Arquitectura de acceso', {
    x: 112,
    y: 618,
    size: 40,
    font: serif,
    color: rgb(0.98, 0.96, 0.93),
  })

  cover.drawText('Mapa premium del ecosistema interno, sus capas de relación y la lógica con la que Anclora organiza acceso, operación e inteligencia.', {
    x: 112,
    y: 568,
    size: 17,
    font: sans,
    color: rgb(0.76, 0.8, 0.86),
    maxWidth: 490,
    lineHeight: 24,
  })

  cover.drawRectangle({
    x: 112,
    y: 448,
    width: 392,
    height: 2,
    color: rgb(0.41, 0.77, 0.95),
    opacity: 0.85,
  })

  await drawLogo(pdfDoc, cover, 'logo-anclora-group.webp', 720, 420, 280, 280)

  cover.drawText('Versión visual para acceso corporativo', {
    x: 112,
    y: 410,
    size: 19,
    font: serif,
    color: rgb(0.95, 0.9, 0.79),
  })

  cover.drawText('Incluye la posición relativa de cada aplicación y su función dentro del ecosistema.', {
    x: 112,
    y: 380,
    size: 15,
    font: sans,
    color: rgb(0.7, 0.76, 0.83),
  })

  const architecturePage = pdfDoc.addPage([1190, 842])
  drawBackground(architecturePage, hexToRgb('#d1a847'), hexToRgb('#c589ff'))

  architecturePage.drawText('Mapa corporativo actual', {
    x: 72,
    y: 760,
    size: 30,
    font: serif,
    color: rgb(0.98, 0.96, 0.93),
  })

  architecturePage.drawText('Tres capas coordinadas para leer el ecosistema como acceso, operación y activación.', {
    x: 72,
    y: 726,
    size: 15,
    font: sans,
    color: rgb(0.75, 0.8, 0.86),
  })

  const columnWidth = 330
  const columnGap = 24
  const startX = 72
  const topY = 666
  const columnHeight = 560

  for (const [index, group] of architectureGroups.entries()) {
    const x = startX + index * (columnWidth + columnGap)
    const y = topY - columnHeight
    const primary = hexToRgb(group.accent[0])
    const secondary = hexToRgb(group.accent[1])

    architecturePage.drawRectangle({
      x,
      y,
      width: columnWidth,
      height: columnHeight,
      color: rgb(0.09, 0.13, 0.18),
      opacity: 0.94,
      borderColor: primary,
      borderWidth: 1,
    })

    architecturePage.drawCircle({
      x: x + columnWidth - 36,
      y: y + columnHeight - 34,
      size: 54,
      color: secondary,
      opacity: 0.08,
    })

    architecturePage.drawText(group.eyebrow.toUpperCase(), {
      x: x + 24,
      y: y + columnHeight - 34,
      size: 10,
      font: sansBold,
      color: rgb(0.89, 0.84, 0.73),
    })

    architecturePage.drawText(group.title, {
      x: x + 24,
      y: y + columnHeight - 66,
      size: 18,
      font: serif,
      color: rgb(0.98, 0.96, 0.93),
      maxWidth: columnWidth - 48,
      lineHeight: 20,
    })

    architecturePage.drawText(group.body, {
      x: x + 24,
      y: y + columnHeight - 114,
      size: 11.5,
      font: sans,
      color: rgb(0.72, 0.77, 0.84),
      maxWidth: columnWidth - 48,
      lineHeight: 16,
    })

    let cursorY = y + columnHeight - 220
    for (const app of group.apps) {
      architecturePage.drawRectangle({
        x: x + 18,
        y: cursorY - 104,
        width: columnWidth - 36,
        height: 104,
        color: rgb(0.12, 0.17, 0.23),
        borderColor: rgb(0.22, 0.28, 0.36),
        borderWidth: 1,
      })

      architecturePage.drawRectangle({
        x: x + 18,
        y: cursorY - 4,
        width: columnWidth - 36,
        height: 4,
        color: primary,
      })

      await drawLogo(pdfDoc, architecturePage, app.logo, x + 30, cursorY - 86, 58, 58)

      architecturePage.drawText(app.eyebrow.toUpperCase(), {
        x: x + 102,
        y: cursorY - 20,
        size: 8.5,
        font: sansBold,
        color: rgb(0.84, 0.88, 0.92),
      })

      architecturePage.drawText(app.title, {
        x: x + 102,
        y: cursorY - 46,
        size: 16,
        font: serif,
        color: rgb(0.98, 0.96, 0.93),
        maxWidth: columnWidth - 132,
      })

      architecturePage.drawText(app.description, {
        x: x + 102,
        y: cursorY - 74,
        size: 9.4,
        font: sans,
        color: rgb(0.72, 0.77, 0.84),
        maxWidth: columnWidth - 132,
        lineHeight: 12.5,
      })

      cursorY -= 122
    }
  }

  const pdfBytes = await pdfDoc.save()
  fs.writeFileSync(outputPath, pdfBytes)
  process.stdout.write(`Architecture PDF written to ${outputPath}\n`)
}

buildPdf().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
