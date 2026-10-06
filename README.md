# 👥 Multi User Portfolio CMS
## 📄 Overview
A full-stack portfolio management system designed to allow multiple users to create, manage, and showcase their professional portfolios through a public portfolio website and a private admin dashboard.

Each user has their own portfolio data, including projects, skills, education, work experience, links, and profile information. The system separates public portfolio content from administrative functionality, allowing users to manage their information without exposing the management interface.

I'm building this project from the backend and database up, focusing on understanding the architecture, data flow, authentication, authorization, API design, and how the different parts of a full-stack application communicate with each other.

## 🛠️ Technologies

### 🎨 Frontend

* React
* TypeScript
* Tailwind CSS

### ⚙️ Backend

* Node.js
* Express.js
* REST APIs

### 🗄️ Database

* PostgreSQL
* Supabase

### 🔐 Authentication & Security

* Argon2
* JWT

### 💻 Development Tools

* Git
* GitHub
* VS Code

# ⚙️ Backend Structure
## Database Structure
![database schema](Images/supabase-schema-fpstvntbddfwofucujra%20(1).png)     
The database is currently structured around multiple related tables to support independent portfolio data for each user.
### Tables    
We have 10 tables for the project to store data , The database designed by ``PostgreSQL`` and ``Supabase``.
#### 👥 Users
**Purpose:** Stores authentication and user identity information.
* Primary Key: ``user_id``
* Unique fields: ``username``, ``email``
* Passwords are stored as ``Argon2 hashes``
* Used as the parent entity for user-specific portfolio data.
* ``UUID`` used as a ``user_id`` .

#### 📁 Projects
**Purpose:** Store users' projects with its details.
* Primary Key: ``project_id``.
* Foreign Keys: ``user_id``.
* ``UUID`` used as a ``Project_id`` .
* Contains project metadata such as status, dates, and pinned state.
* Supports optional GitHub/demo links.





  

