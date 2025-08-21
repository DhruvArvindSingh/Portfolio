# Gemini Project Context: Portfolio

This document provides a comprehensive overview of the Portfolio project, its structure, components, and key functionalities. It is intended to be used by LLMs to understand the project context and assist in future development tasks.

## Project Overview

This is a personal portfolio website built with Next.js, TypeScript, and Three.js. It showcases the developer's projects, experience, and skills in an interactive and visually appealing manner. The portfolio features a 3D brain model as a background, animated cards for projects and experiences, and a clean, modern UI.

## Technologies Used

-   **Framework**: Next.js 15.3.3
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS 4
-   **3D Rendering**: Three.js, @react-three/fiber, @react-three/drei
-   **Linting**: ESLint
-   **Package Manager**: npm

## Project Structure

```
/
├── public/                 # Static assets (images, 3D models)
├── src/
│   ├── app/                # Main application files
│   │   ├── globals.css     # Global CSS styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Main page component
│   ├── components/         # Reusable React components
│   │   ├── AlienCard.tsx
│   │   ├── Brain3D.tsx
│   │   ├── ExperienceCard.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── Reveal.tsx
│   │   └── ScrollProgressBar.tsx
│   └── lib/                # Library files
│       └── colorMap.ts     # Color mappings for styling
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

## Components

### `AlienCard.tsx`

A card component with a UFO animation that displays content. It is used for both project and experience cards.

-   **Props**: `children`, `side`, `delayMs`, `variant`, `accentClasses`, `badge`.
-   **Animation**: The card has a drop-in sequence with a UFO and a tractor beam animation. The animation is triggered when the card becomes visible in the viewport.

### `Brain3D.tsx`

A component that renders a 3D brain model with animations and interactive elements. It serves as the background for the entire portfolio.

-   **Features**:
    -   The brain model rotates based on mouse movement.
    -   It has a color transition effect, cycling between vibrant purple and dark purple.
    -   When the brain is in its dark phase, it emits lightning effects.
    -   The scene also includes floating decorative shapes, particles, and a rocket to create a dynamic and immersive experience.

### `ExperienceCard.tsx`

A card component that displays information about a work experience. It uses the `AlienCard` component as a wrapper.

-   **Props**: `title`, `company`, `companyUrl`, `description`, `period`, `technologies`, `links`, `color`, `isLeft`, `revealDelayMs`.
-   **Layout**: The card is designed to be used in a timeline layout, with an option to be placed on the left or right side.

### `ProjectCard.tsx`

A card component that displays information about a project. It also uses the `AlienCard` component.

-   **Props**: `title`, `subtitle`, `description`, `year`, `technologies`, `links`, `color`, `isLeft`, `revealDelayMs`.
-   **Layout**: Similar to the `ExperienceCard`, it is designed for a timeline layout.

### `Reveal.tsx`

A component that reveals its children with a slide-in animation when it becomes visible in the viewport.

-   **Props**: `children`, `direction`, `delayMs`, `className`.
-   **Animation**: The slide-in direction can be customized (`up`, `down`, `left`, `right`).

### `ScrollProgressBar.tsx`

A component that displays a progress bar at the top of the page, indicating the scroll position.

## Key Logic

The main logic of the portfolio is in `src/app/page.tsx`. This file contains the data for experiences and projects, and it renders the main sections of the portfolio: Hero, Experience, Projects, and Contact.

-   **Data**: The `experiences` and `projects` arrays contain the data for the respective sections.
-   **State Management**: The component uses `useState` to manage the mobile menu, the visibility of additional projects, and the contact form data.
-   **Contact Form**: The contact form uses a `mailto` link to open the user's default email client with the form data pre-filled.

## Future Improvements & LLM Interaction

When working on this project, the LLM should:

1.  **Read this file first**: Before making any changes, read this `GEMINI.md` file to get the full context of the project.
2.  **Update the context**: If any changes are made to the project's structure, components, or key logic, update this file accordingly.
3.  **Maintain conventions**: Follow the existing coding style, component structure, and naming conventions.
4.  **Focus on reusability**: When creating new components, ensure they are reusable and follow the existing design patterns.
5.  **Optimize for performance**: The portfolio uses 3D models and animations, so it's important to keep performance in mind. When adding new features, ensure they are optimized for a smooth user experience.
6.  **Enhance animations**: The current animations are simple. Future improvements could include more complex and interactive animations.
7.  **Refactor data**: The project and experience data is currently hardcoded in `page.tsx`. This could be refactored into a separate data file or fetched from a CMS.
