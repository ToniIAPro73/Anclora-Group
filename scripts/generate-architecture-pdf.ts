/**
 * Generates the access-architecture PDF from the app registry (SSOT).
 * No inline inventory: lanes and apps derive from src/lib/group-access.ts.
 *
 * Run: npm run generate:architecture-pdf
 * Output: private-docs/anclora-group-access-architecture-v1.pdf
 * (served authenticated via /docs/architecture-pdf, never from public/)
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PDFDocument, StandardFonts, rgb, type PDFPage, type RGB } from 'pdf-lib'
import sharp from 'sharp'
import { getArchitectureLanes, type GroupArchitectureLayer } from '../src/lib/group-access'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const privateDocsDir = path.join(repoRoot, 'private-docs')
const brandDir = path.join(repoRoot, 'public', 'brand')
const outputPath = path.join(privateDocsDir, 'anclora-group-access-architecture-v1.pdf')

const LAYER_ACCENTS: Record<GroupArchitectureLayer, [string, string]> = {
  entry: ['#d1a847', '#79d9d6'],
  core: ['#56bdd0', '#7f80ff'],
  activation: ['#c589ff', '#f2c35d'],
}

function hexToRgb(hex: string): RGB {
  const normalized = hex.replace('#', '')
  const safeHex = normalized.length === 3
    ? normalized.split('').map((char: string) => char + char).join('')
    : normalized

  const red = parseInt(safeHex.slice(0, 2), 16) / 255
  const green = parseInt(safeHex.slice(2, 4), 16) / 255
  const blue = parseInt(safeHex.slice(4, 6), 16) / 255
  return rgb(red, green, blue)
}

function drawBackground(page: PDFPage, primary: RGB, secondary: RGB) {
  const { width, height } = page.getSize()
  page.drawRectangle({ x: 0, y: 0, width, height, color: rgb(0.06, 0.09, 0.14) })
  page.drawCircle({ x: 120, y: height - 110, size: 220, color: primary, opacity: 0.1 })
  page.drawCircle({ x: width - 70, y: 110, size: 240, color: secondary, opacity: 0.08 })
}

async function drawLogo(pdfDoc: PDFDocument, page: PDFPage, logoSrc: string, x: number, y: number, maxWidth: number, maxHeight: number) {
  const fileName = logoSrc.replace('/brand/', '')
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
  fs.mkdirSync(privateDocsDir, { recursive: true })

  const lanes = getArchitectureLanes()

  const pdfDoc = await PDFDocument.create()
  pdfDoc.setTitle('Anclora Group Access Architecture v1')
  pdfDoc.setAuthor('Anclora Group')
  pdfDoc.setCreator('Anclora Group + pdf-lib')
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

  await drawLogo(pdfDoc, cover, '/brand/anclora-group.webp', 720, 420, 280, 280)

  cover.drawText('Versión visual para acceso corporativo', {
    x: 112,
    y: 410,
    size: 19,
    font: serif,
    color: rgb(0.95, 0.9, 0.79),
  })

  cover.drawText('Documento generado desde el registry vivo del portal. Incluye todas las aplicaciones registradas y su capa de arquitectura.', {
    x: 112,
    y: 380,
    size: 15,
    font: sans,
    color: rgb(0.7, 0.76, 0.83),
    maxWidth: 490,
    lineHeight: 21,
  })

  const architecturePage = pdfDoc.addPage([1190, 842])
  drawBackground(architecturePage, hexToRgb('#d1a847'), hexToRgb('#c589ff'))

  architecturePage.drawText('Mapa corporativo actual', {
    x: 72,
    y: 780,
    size: 30,
    font: serif,
    color: rgb(0.98, 0.96, 0.93),
  })

  architecturePage.drawText('Tres capas coordinadas para leer el ecosistema como acceso, operación y activación.', {
    x: 72,
    y: 748,
    size: 15,
    font: sans,
    color: rgb(0.75, 0.8, 0.86),
  })

  const columnWidth = 330
  const columnGap = 24
  const startX = 72
  const topY = 700
  const columnHeight = 610
  const rowPitch = 74
  const rowHeight = 66

  for (const [index, lane] of lanes.entries()) {
    const x = startX + index * (columnWidth + columnGap)
    const y = topY - columnHeight
    const [primaryHex, secondaryHex] = LAYER_ACCENTS[lane.key]
    const primary = hexToRgb(primaryHex)
    const secondary = hexToRgb(secondaryHex)

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

    architecturePage.drawText(lane.eyebrow.toUpperCase(), {
      x: x + 24,
      y: y + columnHeight - 32,
      size: 10,
      font: sansBold,
      color: rgb(0.89, 0.84, 0.73),
    })

    architecturePage.drawText(lane.title, {
      x: x + 24,
      y: y + columnHeight - 62,
      size: 18,
      font: serif,
      color: rgb(0.98, 0.96, 0.93),
      maxWidth: columnWidth - 48,
      lineHeight: 20,
    })

    architecturePage.drawText(lane.body, {
      x: x + 24,
      y: y + columnHeight - 104,
      size: 10.5,
      font: sans,
      color: rgb(0.72, 0.77, 0.84),
      maxWidth: columnWidth - 48,
      lineHeight: 14,
    })

    let cursorY = y + columnHeight - 158
    for (const app of lane.apps) {
      architecturePage.drawRectangle({
        x: x + 18,
        y: cursorY - rowHeight,
        width: columnWidth - 36,
        height: rowHeight,
        color: rgb(0.12, 0.17, 0.23),
        borderColor: rgb(0.22, 0.28, 0.36),
        borderWidth: 1,
      })

      architecturePage.drawRectangle({
        x: x + 18,
        y: cursorY - 3,
        width: columnWidth - 36,
        height: 3,
        color: primary,
      })

      if (app.logoSrc) {
        await drawLogo(pdfDoc, architecturePage, app.logoSrc, x + 26, cursorY - rowHeight + 10, 46, 46)
      }

      architecturePage.drawText(app.eyebrow.toUpperCase(), {
        x: x + 86,
        y: cursorY - 18,
        size: 8,
        font: sansBold,
        color: rgb(0.84, 0.88, 0.92),
        maxWidth: columnWidth - 120,
      })

      architecturePage.drawText(app.title, {
        x: x + 86,
        y: cursorY - 42,
        size: 13.5,
        font: serif,
        color: rgb(0.98, 0.96, 0.93),
        maxWidth: columnWidth - 120,
      })

      cursorY -= rowPitch
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
