# User Management App

This is a React application that integrates with the [Reqres API](https://reqres.in/) to provide basic user management functionality. It includes user authentication, a paginated user list, and inline editing/deletion capabilities within user cards.

## Features

### Level 1: Authentication
- Login screen with email and password fields
- Authenticates using POST `/api/login`
- Stores authentication token in localStorage
- Redirects to user list upon successful login

### Level 2: User List
- Displays a paginated list of users fetched from GET `/api/users?page=#`
- Shows each user's first name, last name, and avatar in a card layout
- Implements pagination with Previous/Next buttons

### Level 3: User Management
- Edit user details directly within each card
- Updates user data via PUT `/api/users/{id}`
- Deletes users via DELETE `/api/users/{id}`
- Shows success/error messages for operations

## Prerequisites

- Node.js (v14 or higher recommended)
- npm (v6 or higher)

## Installation

1. **Clone the repository:**
   ```bash
   git clone <https://github.com/Code-By-Tom2/user-management-app.git>
   cd reqres-user-management#   u s e r - m a n a g e m e n t - a p p 
 
 