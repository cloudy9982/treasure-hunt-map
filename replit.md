# I💗C 一週年尋寶之旅🐶🐰

## Overview

This is a romantic treasure hunt application designed for couples celebrating their first anniversary. The application features a daily task selection system where users can choose from three different task types each day over a 20-day period (July 26 - August 15, 2025). Each day presents a unique location with three mission options: 甜蜜型 (Romance), 搞笑型 (Fun), and 陪伴型 (Companion), allowing couples to customize their experience based on their mood and preferences.

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
- **Current Status**: Backend infrastructure ready but not actively used (client-side only)

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
- Renders an interactive treasure hunt map with 20 unique locations
- Daily task selection system: users choose from 3 task types each day
- Task types: 甜蜜型 (Romance), 搞笑型 (Fun), 陪伴型 (Companion)
- Two-phase gameplay: Prologue → Daily Adventure
- Manages unlock logic based on current date vs. start date (July 26, 2025)
- Handles localStorage persistence for completed days and selected tasks
- Visual path connecting all locations with SVG curves and animated effects

### 2. Punch Box Modal (`PunchBoxModal`)
- Displays mission details when a box is clicked
- Features floating heart animations for enhanced romantic experience
- Custom styling with gradient backgrounds and rounded corners

### 3. Floating Hearts (`FloatingHearts`)
- Animated heart emojis that appear when boxes are opened
- CSS animations for floating effects
- Automatic cleanup after animation completion

### 4. Mission System
- 20 days of romantic missions/activities (plus prologue)
- Three task types available daily: 甜蜜型 (Romance), 搞笑型 (Fun), 陪伴型 (Companion)
- Each day offers three different mission options for the same location
- Themed locations from "記憶森林入口" to "一週年紀念台"
- Daily choice element: users select one task type per day and can't change
- Special anniversary finale: "愛的宣言", "週年慶典", or "週年總結"
- Progressive difficulty and intimacy as the days advance

## Data Flow

1. **Application Initialization**: 
   - App loads with React Query client setup
   - localStorage checked for map progress (opened nodes, selected path, game phase)
   - Current date compared against start date for unlock logic

2. **Game Progression**:
   - Phase 1: Prologue - User accepts treasure hunt rules
   - Phase 2: Daily Adventure - Daily location unlocking and task selection

3. **Node Interaction**:
   - User clicks on unlocked daily location
   - Task selector modal appears with three options
   - User selects preferred task type (甜蜜型/搞笑型/陪伴型)
   - Mission modal displays selected task details
   - Completed days show selected task when clicked again

4. **State Persistence**:
   - Complete game state (completed days, selected tasks) automatically saved to localStorage
   - Progress maintained across browser sessions using 'treasureHuntProgress' key
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

1. **Daily Choice System**: Changed from fixed paths to daily task selection for more flexibility
2. **Love Theme**: Custom CSS variables for romantic color palette with I💗C branding
3. **Date-based Unlocking**: Tasks unlock based on real calendar dates (July 26 - August 15, 2025)
4. **Local Storage**: Client-side persistence for offline capability
5. **Component Architecture**: Separation of concerns with dedicated components for different features
6. **Type Safety**: Full TypeScript implementation across frontend and backend
7. **Responsive Design**: Mobile-first approach with Tailwind CSS utilities

## Recent Changes (January 2025)

- **Major Architecture Change**: Transformed from three branching paths to daily task selection system
- **New Title**: Changed to "I💗C 一週年尋寶之旅🐶🐰" with playful romantic description
- **Task Selection Modal**: Added interactive modal for choosing daily task types
- **Expanded Content**: Added 20 days of diverse romantic activities across different categories
- **Simplified Navigation**: Removed path selection complexity in favor of linear daily progression
- **Updated Storage**: Changed localStorage key to 'treasureHuntProgress' for new system