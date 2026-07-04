from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


OUTPUT = "docs/Nishu_Kumari_Vitto_Assignment_Writeup.pdf"


def draw_paragraph(pdf, text, style, x, y, width):
    paragraph = Paragraph(text, style)
    _, height = paragraph.wrap(width, 100 * mm)
    paragraph.drawOn(pdf, x, y - height)
    return y - height


pdf = canvas.Canvas(OUTPUT, pagesize=A4)
page_width, page_height = A4
margin = 20 * mm
content_width = page_width - 2 * margin

ink = HexColor("#172033")
mint = HexColor("#12B886")
muted = HexColor("#596579")
line = HexColor("#DDE3EA")
soft = HexColor("#F5F7FA")

styles = getSampleStyleSheet()
title = ParagraphStyle(
    "Title",
    parent=styles["Title"],
    fontName="Helvetica-Bold",
    fontSize=18,
    leading=22,
    textColor=ink,
    alignment=TA_LEFT,
    spaceAfter=0,
)
subtitle = ParagraphStyle(
    "Subtitle",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8.5,
    leading=11,
    textColor=muted,
)
heading = ParagraphStyle(
    "Heading",
    parent=styles["Heading2"],
    fontName="Helvetica-Bold",
    fontSize=10,
    leading=13,
    textColor=ink,
)
body = ParagraphStyle(
    "Body",
    parent=styles["BodyText"],
    fontName="Helvetica",
    fontSize=8.5,
    leading=12,
    textColor=muted,
)
link = ParagraphStyle(
    "Link",
    parent=body,
    textColor=HexColor("#087F5B"),
)

pdf.setFillColor(ink)
pdf.rect(0, page_height - 13 * mm, page_width, 13 * mm, fill=1, stroke=0)
pdf.setFillColor(mint)
pdf.rect(0, page_height - 15 * mm, page_width, 2 * mm, fill=1, stroke=0)

y = page_height - 28 * mm
y = draw_paragraph(pdf, "Vitto Full Stack Engineering Intern Assignment", title, margin, y, content_width)
y -= 2 * mm
y = draw_paragraph(pdf, "Submission write-up | Nishu Kumari", subtitle, margin, y, content_width)
y -= 5 * mm

pdf.setStrokeColor(line)
pdf.line(margin, y, page_width - margin, y)
y -= 6 * mm

y = draw_paragraph(pdf, "What I built", heading, margin, y, content_width)
y -= 1 * mm
y = draw_paragraph(
    pdf,
    "I built a production-ready loan application portal with a responsive borrower intake form and an operations dashboard. "
    "The system supports strict client/server validation, UUID references, status filtering, debounced search, pagination, "
    "approval/rejection workflows, summary analytics, charts, CSV export, dark mode, reusable components, and mobile-first views. "
    "The Express API uses layered routes, controllers, services, validators, centralized error handling, parameterized PostgreSQL queries, and health checks.",
    body,
    margin,
    y,
    content_width,
)
y -= 5 * mm

y = draw_paragraph(pdf, "Deployment choices", heading, margin, y, content_width)
y -= 1 * mm
y = draw_paragraph(
    pdf,
    "<b>Frontend:</b> Vercel for fast Vite deployments and SPA routing. "
    "<b>Backend:</b> Render Web Service for managed Node.js hosting. "
    "<b>Database:</b> Neon PostgreSQL for a serverless, SSL-enabled production database. "
    "Secrets are stored only in platform environment variables; migration SQL and environment examples are included in the repository.",
    body,
    margin,
    y,
    content_width,
)
y -= 5 * mm

y = draw_paragraph(pdf, "Known issues and improvements", heading, margin, y, content_width)
y -= 1 * mm
y = draw_paragraph(
    pdf,
    "Render's free instance may take a short time to wake after inactivity. The current application intentionally excludes authentication because it was not part of the assessment scope. "
    "With more time, I would add JWT-based role access, an immutable status audit log, automated API/UI tests, CI checks, server-side CSV export, and frontend route-level code splitting.",
    body,
    margin,
    y,
    content_width,
)
y -= 6 * mm

box_height = 30 * mm
pdf.setFillColor(soft)
pdf.roundRect(margin, y - box_height, content_width, box_height, 3 * mm, fill=1, stroke=0)
box_y = y - 7 * mm
box_y = draw_paragraph(pdf, "<b>Live application</b>: https://vitto-loan-portal-sigma.vercel.app", link, margin + 5 * mm, box_y, content_width - 10 * mm)
box_y -= 2 * mm
box_y = draw_paragraph(pdf, "<b>GitHub repository</b>: https://github.com/Nishu-06/vitto-loan-portal", link, margin + 5 * mm, box_y, content_width - 10 * mm)
box_y -= 2 * mm
draw_paragraph(pdf, "<b>Backend API</b>: https://vitto-loan-portal-a7de.onrender.com", link, margin + 5 * mm, box_y, content_width - 10 * mm)

pdf.setFillColor(muted)
pdf.setFont("Helvetica", 7.5)
pdf.drawString(margin, 12 * mm, "Built with React, Vite, TailwindCSS, Node.js, Express, PostgreSQL, Neon, Render, and Vercel.")

pdf.save()
