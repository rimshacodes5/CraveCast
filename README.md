# CraveCast 🥐🍱 — Predictive Demand & Waste Prevention Engine for Home Food Entrepreneurs

> Created for **Hacktoberfest 2026** 🎃  

> An AI agent pipeline combining zero-shot tabular demand forecasting, dish-specific grocery procurement, pre-order social synthesis, and full Sentry telemetry tracing.

---

## 📌 Project Overview

**CraveCast** is a culinary-themed AI decision dashboard designed for home-based food entrepreneurs, cloud kitchens, meal preppers, and artisanal bakers. By analyzing hyper-local environmental factors—such as day of the week, weather forecasts, ambient temperature, and payday cycles—CraveCast predicts exact batch prep requirements, estimates food spoilage risks, and calculates protected capital.

Additionally, CraveCast automatically synthesizes dish-specific raw ingredient shopping lists and generates high-converting pre-order broadcasts for WhatsApp and Instagram to lock in orders before cooking starts.

---

## ✨ Key Features

* **🧠 TabPFN Zero-Shot Demand Engine**: Predicts optimal batch sizes and calculates waste risk percentages based on real-time operational factors.

* **📊 TabPFN Decision Matrix Breakdown**: Explains the exact reasoning behind portion adjustments (e.g., `+15 Weekend Surge`, `-8 Rain Impact`, `+10 Payday Boost`).

* **🛒 Dynamic Dish-Specific Procurement Matrix**: Type any custom menu item (*"Belgian Chocolate Cake"*, *"Steamed Beef Momos"*, *"Spicy Hotpot"*, *"Chicken Biryani"*) to automatically generate a calculated raw ingredient grocery list.

* **📣 Gemma Pre-Order Broadcast Generator**: Synthesizes pre-order broadcast drafts with direct **1-click WhatsApp launch** and quick-copy functionality.

* **🛡️ Real-Time Profit Guard**: Detects unit margin deficits and alerts users if selling price drops below portion cost.

* **🔍 Sentry Agent Telemetry**: Full end-to-end tracing across all pipeline spans `agent.pipeline` → `ai.tabpfn` → `ai.gemma`).

---

## 🛠️ Tech Stack

* **Framework**: Next.js (App Router, React 19)

* **Styling**: Tailwind CSS (v4) with PostCSS

* **Language**: TypeScript

* **Icons**: Lucide React

* **Observability & Tracing**: Sentry Agent Monitoring

* **Palette**: Dark Chocolate Brown `#1C100D`), Vanilla Cream `#FAF6F0`), Espresso `#2C1A1D`), Terracotta `#D97757`)

---

## 🎃 Hacktoberfest 2026

This repository is an official participant in **Hacktoberfest 2026**! We welcome contributions from developers, open-source enthusiasts, and AI builders worldwide.

### How to Contribute:

1. Fork the repository.

2. Pick an open issue or suggest a new feature (e.g., multi-language broadcast support, expanded dish ingredient models, or local weather API integration).

3. Create a feature branch: `git checkout -b feature/amazing-feature`.

4. Commit your changes and open a Pull Request with the `hacktoberfest` tag.

---

## 🚀 Getting Started

### Prerequisites

* Node.js 18.x or later

* npm / pnpm / yarn

### Installation

1. **Clone the repository**:

   ```bash

   git clone [[https://github.com/your-username/CraveCast.git](https://github.com/your-username/CraveCast.git)](https://github.com/your-username/CraveCast.git](https://github.com/your-username/CraveCast.git))

   cd CraveCast