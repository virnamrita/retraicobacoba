# Overview

Retrai is a recruitment management web application built with a modern full-stack architecture. The application enables recruiters to view job postings, browse candidate profiles, and manage the hiring process. It features a React frontend with Tailwind CSS for styling, an Express.js backend API, and uses Drizzle ORM for database operations with PostgreSQL. The system includes candidate management, job posting details, work experience tracking, and video interview functionality.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React 18** with TypeScript for the user interface
- **Vite** as the build tool and development server
- **Wouter** for client-side routing instead of React Router
- **Tailwind CSS** with custom design system variables for styling
- **shadcn/ui** component library with Radix UI primitives
- **TanStack Query** for server state management and API caching
- **React Hook Form** with Zod validation for form handling

## Backend Architecture
- **Express.js** server with TypeScript
- **RESTful API** design with endpoints for candidates, job postings, and work experience
- **In-memory storage** implementation with sample data (designed to be replaceable with database)
- **Modular route registration** system
- **Custom error handling** middleware

## Data Layer
- **Drizzle ORM** configured for PostgreSQL with type-safe database operations
- **Database schema** defining users, job postings, candidates, and work experience tables
- **Zod schemas** for runtime validation derived from database schema
- **Migration system** with Drizzle Kit for schema changes

## UI/UX Design System
- **Custom color palette** with neon green branding and neutral base colors
- **Responsive design** with mobile-first approach
- **Dark mode support** built into the design system
- **Accessible components** using Radix UI primitives
- **Custom CSS variables** for consistent theming

## Development Tools
- **TypeScript** for type safety across the entire stack
- **ESBuild** for production bundling
- **PostCSS** with Autoprefixer for CSS processing
- **Path aliases** configured for clean imports
- **Replit integration** with development banners and error overlays

## Key Features
- **Job posting management** with application metrics and viewing statistics
- **Candidate profile system** with detailed information, work history, and contact details
- **Video interview integration** with custom video player component
- **Work experience tracking** with skills and employment history
- **Responsive candidate cards** with salary expectations and application status
- **Navigation system** with header component and user profile display

# External Dependencies

## Core Framework Dependencies
- **@neondatabase/serverless** - PostgreSQL database adapter for serverless environments
- **drizzle-orm** and **drizzle-kit** - Type-safe ORM and migration toolkit
- **@tanstack/react-query** - Server state management and caching
- **express** - Node.js web framework for API endpoints

## UI Component Libraries
- **@radix-ui/react-*** - Accessible, unstyled UI primitives (accordion, dialog, dropdown, etc.)
- **class-variance-authority** - Utility for managing component variants
- **clsx** and **tailwind-merge** - CSS class name utilities
- **lucide-react** - Icon library
- **embla-carousel-react** - Carousel component

## Form and Validation
- **react-hook-form** - Form state management
- **@hookform/resolvers** - Form validation resolvers
- **zod** - Schema validation library
- **drizzle-zod** - Zod schema generation from Drizzle schemas

## Utilities
- **date-fns** - Date manipulation library
- **nanoid** - Unique ID generation
- **cmdk** - Command palette component
- **wouter** - Lightweight client-side routing

## Development Dependencies
- **vite** - Build tool and development server
- **@vitejs/plugin-react** - React plugin for Vite
- **typescript** - Type checking and compilation
- **tailwindcss** - CSS framework
- **@replit/vite-plugin-runtime-error-modal** - Development error handling
- **@replit/vite-plugin-cartographer** - Replit integration for development