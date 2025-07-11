# 20-Day Surprise Punch Box Application

## Overview

This is a romantic surprise application built as an RPG-themed "punch box" experience where users can unlock daily surprises over a 21-day period (July 26 - August 15). The application presents a grid of boxes that unlock daily, each containing personalized RPG-style missions or activities for couples, with themed locations like "記憶森林入口", "糖果小屋", and "終焉星光台".

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
- **Database**: PostgreSQL with active database schema
- **ORM**: Drizzle ORM with type-safe schema definitions
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Current Storage**: DatabaseStorage implementation with PostgreSQL backend
- **Client Storage**: localStorage for persisting user progress (can be migrated to database)
- **Schema**: Users table and punch_box_progress table for tracking opened boxes

### Authentication and Authorization
- **Current State**: Basic user schema defined but no authentication implemented
- **Prepared Infrastructure**: User table with username/password fields
- **Session Management**: connect-pg-simple configured for PostgreSQL sessions

## Key Components

### 1. Interactive Map (`InteractiveMap`)
- Renders an interactive adventure map with branching paths
- Three distinct paths: 回憶森林線 (Memory Forest), 搞怪沙漠線 (Fun Desert), 星光高塔線 (Starlight Tower)
- Each path contains 5 unique nodes (days 1-5), followed by shared continuation path (days 6-20)
- Three-phase gameplay: Prologue → Path Selection → Adventure
- Manages unlock logic based on current date vs. start date (July 26, 2024)
- Handles localStorage persistence for opened nodes and selected path
- Visual path rendering with SVG curves and animated dash effects

### 2. Punch Box Modal (`PunchBoxModal`)
- Displays mission details when a box is clicked
- Features floating heart animations for enhanced romantic experience
- Custom styling with gradient backgrounds and rounded corners

### 3. Floating Hearts (`FloatingHearts`)
- Animated heart emojis that appear when boxes are opened
- CSS animations for floating effects
- Automatic cleanup after animation completion

### 4. Mission System
- 21 RPG-themed romantic missions/activities (including prologue)
- Three mission types: Romance (R), Fun (F), Challenge (C)
- Three distinct adventure paths with different themes and difficulties
- Path-specific missions for days 1-5, then shared continuation for days 6-20
- Themed locations from "記憶森林入口" to "終焉星光台"
- Strategic choice element: users select one path and cannot change
- Special final mission with "一週年戀人通行證" reward

## Data Flow

1. **Application Initialization**: 
   - App loads with React Query client setup
   - localStorage checked for map progress (opened nodes, selected path, game phase)
   - Current date compared against start date for unlock logic

2. **Game Progression**:
   - Phase 1: Prologue - User signs contract and unlocks path selection
   - Phase 2: Path Selection - User chooses one of three adventure paths
   - Phase 3: Adventure - Daily node unlocking and mission completion

3. **Node Interaction**:
   - User clicks on unlocked map node
   - Path restrictions enforced for days 1-5
   - Modal opens displaying mission details with type indicators (R/F/C)
   - Node state updated in localStorage with visual map updates

4. **State Persistence**:
   - Complete game state (nodes, path, phase) automatically saved to localStorage
   - Progress maintained across browser sessions
   - Database ready for user authentication and progress sync

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