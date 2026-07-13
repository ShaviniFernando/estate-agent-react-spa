# Estate Agent React SPA

A single-page estate agent web application built with React and Vite for the 5COSC026W Advanced Client-Side Web Development coursework. Inspired by rightmove.co.uk, it lets a user search a portfolio of properties by type, price, bedrooms, date added, and postcode area, view full property details with an image gallery, floor plan and map, and manage a favourites list via drag-and-drop or buttons.

## Features

- **Multi-criteria search** — filter properties by any combination of type, min/max price, min/max bedrooms, date added (after / between), and postcode area
- **Enhanced search form** — built with React widget components (select, date picker, range slider) for a consistent, accessible UI
- **Results display** — property cards with image, price, location, and short description, each linking to a full details page
- **Property details page** — large image gallery with thumbnails, and tabbed content (description / floor plan / Google Map)
- **Favourites** — add a property via a favourite button or by dragging its card onto the favourites list; remove via a delete button or by dragging out; clear the whole list in one click; duplicates are prevented
- **Favourites on the search page** — the current favourites list is visible and updates live while searching
- **Responsive design** — a large-screen layout and a distinct layout below iPad-landscape width, using hand-written media queries with CSS Grid/Flexbox
- **Client-side security** — a Content-Security-Policy meta tag
- **Automated tests** — Jest tests covering the search filter logic and the favourites state management

## Tech Stack

- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/) for client-side routing
- React state for favourites management
- React widget libraries for form inputs (see `package.json`)
- [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/) for testing
- Deployed via GitHub Pages (or Vercel/Netlify — see Deployment below)

## Project Structure

```
estate-agent/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── PropertyCard.jsx
│   │   ├── PropertyList.jsx
│   │   ├── ImageGallery.jsx
│   │   └── FavouriteList.jsx
│   ├── data/
│   │   └── properties.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── PropertyDetails.jsx
│   ├── styles/
│   │   └── main.css
│   ├── utils/
│   │   ├── favourites.js
│   │   ├── favourites.test.js
│   │   ├── filterProperties.js
│   │   └── filterProperties.test.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or later
- npm

### Installation

```bash
git clone https://github.com/ShaviniFernando/estate-agent-react-spa.git
cd estate-agent-react-spa
npm install
```

### Available Scripts

```bash
npm run dev       # start the development server
npm run build     # build for production
npm run preview   # preview the production build locally
npm run lint      # run ESLint
npm test          # run the test suite
```

## Property Data

Sample property data is provided in `src/data/properties.js`. Each property includes its type, price, bedrooms, tenure, location, postcode, description, an image gallery, a floor plan image, a Google Maps embed URL, and the date it was added. The dataset is loaded directly into the frontend — no backend or server is required.

## Testing

Run the test suite with:

```bash
npm test
```

Tests cover the property search/filter logic and the favourites add/remove/clear behaviour, including duplicate prevention.

## Deployment

- **Live URL:** _add your deployed link here_
- **Repository:** https://github.com/ShaviniFernando/estate-agent-react-spa

## Security

This application implements a Content-Security-Policy via a meta tag in `index.html` to prevent client-side injection.

## Author

Shavini Fernando — coursework submission for 5COSC026W, University of Westminster, 2025/26.