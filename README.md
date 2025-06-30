# Backlink Marketplace

## Project Overview

### Backlink Marketplace

This project is a simulation of a **Backlink Marketplace** that allows users to list their websites, manage backlink-related offers (such as guest posts, link insertions, homepage placements), and edit website details through a multi-section form.

### Key Features:

- Website List Page with pagination.
- Website Details Page for adding or editing website information.
- Global state sync to ensure real-time updates.
- Pixel-perfect UI following the provided Figma design.
- Extensive form validation using **Zod**.
- Use of **Tailwind CSS** and **shadcn/ui** for UI components.
- **Zustand** for state management.
- LocalStorage persistence for form data (bonus task).

---

## Installation & Setup

### Requirements:

- Node.js (>=16.x.x)
- npm or yarn

### Steps to Run Locally:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Saloni231/websiteMangement
   cd websiteMangement

   ```

2. **Install Dependencies:**
   If you're using npm:

   ```bash
   npm install
   ```

   Or if you're using yarn:

   ```bash
   yarn install
   ```

3. **Start the Development Server:**

   ```bash
   npm run dev
   ```

   Or if you're using yarn:

   ```bash
   yarn dev
   ```

The app should now be running on http://localhost:3000.

4. **Build for Production (for Vercel Deployment):**
   To build the app for production:

   ```bash
   npm run build
   ```

5. **Start the Production Build:**
   After building the app, you can run it with:

   ```bash
   npm run start
   ```

### Technologies Used

- React.js / Next.js (Latest Version)

- Tailwind CSS (For styling)

- shadcn/ui (UI Components)

- Zustand (State Management)

- Zod (Validation Schema)

- TypeScript (For type safety)

- Vercel (For deployment)

## Deployment

This project is deployed on Vercel.

Production URL: [Backlink Marketplace on Vercel](https://backlinkmarketplace.vercel.app/my-website)
