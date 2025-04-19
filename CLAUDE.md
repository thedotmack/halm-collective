# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- `npm install` - Install dependencies
- `npm run dev` - Start development server (localhost:4321)
- `npm run build` - Build production site to ./dist/
- `npm run preview` - Preview production build locally
- `npm run astro ...` - Run Astro CLI commands

## Code Style Guidelines
- **Formatting**: Use consistent indentation (2 spaces) and follow Astro component structure
- **Component Structure**: Place interfaces at top, then props destructuring, followed by template
- **TypeScript**: Use TypeScript interfaces for component props with proper typing
- **Naming**: Use PascalCase for components, camelCase for variables and functions
- **CSS**: Use Tailwind classes for styling; custom styles in component <style> blocks
- **Client Scripts**: Place component JavaScript in <script> tags at the bottom
- **Imports**: Group imports by type (components, utils, styles)
- **Error Handling**: Use fallback UI patterns (e.g., "Icon not found" for missing icons)
- **Comments**: Add descriptive comments for complex logic