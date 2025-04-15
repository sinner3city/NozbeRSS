# React RSS Feed app

Run in terminal:

1. npm install
2. npm run dev

## ENV:

-   Vite v6
-   Node: v20

## MAIN TechStack:

1. React v18
2. TypeScript

## DESIGN:

1. AntD
2. Styled-Component

### RSS Features

src/modules/RSS

#### Feed Management

-   Add new RSS feeds by URL
-   Remove existing feeds
-   Update feed titles
-   Automatic feed parsing and data extraction
-   Persistent storage of feeds in localStorage

#### Article Management

-   View all articles from all feeds
-   Article details including:
    -   Title
    -   Description
    -   Publication date
    -   Link to original content
    -   Featured image (if available)

#### Article Status Features

-   Mark articles as read/unread
-   Add/remove articles to favorites
-   Persistent storage of read and favorite status in localStorage
-   Visual indicators for read/unread and favorite status

#### Filtering System

-   Filter articles by:
    -   All articles
    -   Favorites only
    -   Unread articles only
-   Filter counts displayed for each category
-   Persistent filter selection

#### User Interface

-   Clean and intuitive interface
-   Real-time notifications for actions
-   Responsive design
-   Visual feedback for user actions
-   Article sorting by publication date

#### Data Persistence

-   Automatic saving of:
    -   Feed list
    -   Article read status
    -   Favorite articles
    -   Filter preferences
-   Data persists across browser sessions

#### Error Handling

-   Validation for duplicate feeds
-   Error notifications for failed operations
-   Success notifications for completed actions
