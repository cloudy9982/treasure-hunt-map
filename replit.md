# 20-Day Surprise Punch Box Application

## Overview

This is a romantic surprise application built as a "punch box" experience where users can unlock daily surprises over a 20-day period (July 27 - August 15). The application presents a grid of boxes that unlock daily, each containing personalized missions or activities for couples.

## User Preferences

Preferred communication style: Simple, everyday language.
Language: Chinese (Traditional) - User provided Chinese text for the application interface.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state, local React state for UI
- **Data Persistence**: Browser localStorage for tracking opened boxes

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Module System**: ES Modules
- **Development**: tsx for TypeScript execution in development
- **Production**: esbuild for bundling the server code

### Data Storage Solutions
- **Database**: PostgreSQL (configured but not actively used yet)
- **ORM**: Drizzle ORM with type-safe schema definitions
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Current Storage**: In-memory storage implementation for user data
- **Client Storage**: localStorage for persisting user progress

### Authentication and Authorization
- **Current State**: Basic user schema defined but no authentication implemented
- **Prepared Infrastructure**: User table with username/password fields
- **Session Management**: connect-pg-simple configured for PostgreSQL sessions

## Key Components

### 1. Punch Box Grid (`PunchBoxGrid`)
- Renders a 4x5 grid of 20 boxes representing each day
- Manages unlock logic based on current date vs. start date (July 27, 2024)
- Handles localStorage persistence for opened boxes
- Provides visual feedback for locked, unlocked, and opened states

### 2. Punch Box Modal (`PunchBoxModal`)
- Displays mission details when a box is clicked
- Features floating heart animations for enhanced romantic experience
- Custom styling with gradient backgrounds and rounded corners

### 3. Floating Hearts (`FloatingHearts`)
- Animated heart emojis that appear when boxes are opened
- CSS animations for floating effects
- Automatic cleanup after animation completion

### 4. Mission System
- 20 predefined romantic missions/activities
- Each mission includes title, emoji, and detailed description
- Missions range from simple gestures to elaborate romantic activities

## Data Flow

1. **Application Initialization**: 
   - App loads with React Query client setup
   - localStorage checked for previously opened boxes
   - Current date compared against start date for unlock logic

2. **Box Interaction**:
   - User clicks on unlocked box
   - Modal opens displaying mission details
   - Box state updated in localStorage
   - Visual feedback provided through animations

3. **State Persistence**:
   - Box states automatically saved to localStorage
   - Progress maintained across browser sessions
   - No server-side persistence currently implemented

## External Dependencies

### UI and Styling
- **Radix UI**: Comprehensive primitive components for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant API for components
- **clsx**: Conditional CSS class utilities

### Development and Build
- **Vite**: Fast build tool with hot module replacement
- **esbuild**: Fast JavaScript bundler for production builds
- **tsx**: TypeScript execution for development
- **TypeScript**: Type safety and enhanced developer experience

### Backend and Database
- **Drizzle ORM**: Type-safe database operations
- **Drizzle Kit**: Database migrations and schema management
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **connect-pg-simple**: PostgreSQL session store

### State Management
- **TanStack Query**: Server state management and caching
- **Wouter**: Minimal routing library

## Deployment Strategy

### Development
- **Command**: `npm run dev`
- **Features**: Hot module replacement, TypeScript compilation, development server
- **Environment**: NODE_ENV=development

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Command**: `npm run build` followed by `npm start`

### Environment Configuration
- **Database**: Requires `DATABASE_URL` environment variable
- **Platform**: Configured for Replit with specialized plugins
- **Error Handling**: Runtime error overlay in development

### Database Management
- **Migrations**: `npm run db:push` applies schema changes
- **Schema**: Defined in `shared/schema.ts`
- **Config**: `drizzle.config.ts` manages database connection and migration settings

## Notable Design Decisions

1. **Love Theme**: Custom CSS variables for romantic color palette
2. **Date-based Unlocking**: Boxes unlock based on real calendar dates
3. **Local Storage**: Client-side persistence for offline capability
4. **Component Architecture**: Separation of concerns with dedicated components for different features
5. **Type Safety**: Full TypeScript implementation across frontend and backend
6. **Responsive Design**: Mobile-first approach with Tailwind CSS utilities