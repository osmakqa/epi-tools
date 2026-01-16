# Emergency Physicians Initiative Hub (EPI Tools)

EPI Tools is a comprehensive critical care resource application designed specifically for Emergency Physicians. It provides a suite of high-utility tools including resuscitation trackers, pediatric calculators, antimicrobial guidelines, and clinical decision pathways.

## Features

- **Code Blue Tracker**: Advanced real-time resuscitation logger for ACLS, PALS, and general emergencies.
- **Pediatric Calculator**: Integrated weight-based dosing for medications, IVF, and resuscitation.
- **Antimicrobial Guide**: Searchable DOH National Guidelines for pediatric and adult populations.
- **Clinical Pathways**: Interactive decision support for sepsis, stroke (NIHSS), trauma (ATLS), and more.
- **Ortho Guide**: Extensive database of orthopedic injuries, splinting techniques, and management.
- **Web Workstation Mode**: Optimized interface for desktop workstation use.

## Tech Stack

- **React 19**
- **TypeScript**
- **Tailwind CSS** (Utility-first styling)
- **Gemini API** (Intelligent features)
- **Vite** (Build tool)

## Local Development

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set your Gemini API Key in the environment:
   ```bash
   # Create a .env file
   VITE_API_KEY=your_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment

This app is ready to be deployed to **Vercel** or **GitHub Pages**.

### Vercel
Connect your GitHub repository to Vercel. It will automatically detect the configuration and deploy. Ensure you add `API_KEY` to the Vercel project environment variables.