# 👥 Multi User Portfolio CMS
## 📄 Overview
A full-stack portfolio management system designed to allow multiple users to create, manage, and showcase their professional portfolios through a public portfolio website and a private admin dashboard.

Each user has their own portfolio data, including projects, skills, education, work experience, links, and profile information. The system separates public portfolio content from administrative functionality, allowing users to manage their information without exposing the management interface.

I'm building this project from the backend and database up, focusing on understanding the architecture, data flow, authentication, authorization, API design, and how the different parts of a full-stack application communicate with each other.

## 🛠️ Technologies

### 🎨 Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### ⚙️ Backend

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![REST API](https://img.shields.io/badge/REST_APIs-02569B?style=for-the-badge&logo=fastapi&logoColor=white)

### 🗄️ Database

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

### 🔐 Authentication & Security

![Argon2](https://img.shields.io/badge/Argon2-5C6BC0?style=for-the-badge&logo=letsencrypt&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

### 💻 Development Tools

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)

### 🧪 Testing

![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

# ⚙️ Backend Structure
<br>

## 🗄️ Database Architecture
![database schema](Images/supabase-schema-fpstvntbddfwofucujra%20(1).png)     

The database is built on **PostgreSQL** (hosted via **Supabase**). It is designed to host multi-tenant portfolio data with full isolation between users.

### Schema Overview



* **`users` & `profiles`**: Core authentication data and extended user profile information.
* **`projects`**: Portfolio projects, metadata, visibility settings, and project status.
* **`technologies`**: Reusable technologies that can be associated with projects and user skills.
* **`projects_tech`**: Junction table linking projects with their associated technologies.
* **`users_skills`**: Links users with the technologies representing their skills.
* **`projects_links`**: External links associated with individual projects, such as GitHub or live demos.
* **`social_links`**: External social and professional profiles associated with each user.
* **`work_experience`**: Professional experience and employment history for each user.
* **`education`**: Academic background and educational history for each user.
---

### Detailed Schema & Tables

<details>
<summary><b>🔍 Click to view all Tables & Columns specifications</b></summary>

## Table `users`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `user_id` | `uuid` | Primary |
| `username` | `varchar` |  Unique |
| `email` | `varchar` |  Unique |
| `first_name` | `varchar` |  |
| `last_name` | `varchar` |  |
| `password_hash` | `text` |  |

## Table `projects`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `project_id` | `uuid` | Primary |
| `user_id` | `uuid` |  |
| `project_name` | `varchar` |  |
| `details` | `text` |  Nullable |
| `photo_url` | `text` |  Nullable |
| `start_date` | `date` |  |
| `finished_date` | `date` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |
| `project_status` | `varchar` |  Nullable |
| `features` | `text` |  Nullable |
| `single_project` | `bool` |  |
| `pinned` | `bool` |  Nullable |
| `is_public` | `bool` |  Nullable |

## Table `technologies`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `tech_id` | `int4` | Primary |
| `tech_name` | `varchar` |  |

## Table `projects_tech`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `proj_tech_id` | `int4` | Primary |
| `project_id` | `uuid` |  |
| `tech_id` | `int4` |  |

## Table `users_skills`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `skill_id` | `int4` | Primary |
| `user_id` | `uuid` |  |
| `tech_id` | `int4` |  |

## Table `projects_links`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `proj_url_id` | `int4` | Primary |
| `proj_id` | `uuid` |  |
| `label` | `varchar` |  |
| `url` | `text` |  |

## Table `social_links`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `social_url_id` | `int4` | Primary |
| `user_id` | `uuid` |  |
| `label` | `varchar` |  |
| `url` | `text` |  |

## Table `work_experience`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `exp_id` | `int4` | Primary |
| `user_id` | `uuid` |  |
| `company_name` | `varchar` |  |
| `jop_title` | `varchar` |  Nullable |
| `start_date` | `date` |  |
| `end_date` | `date` |  Nullable |
| `details` | `text` |  Nullable |
| `is_current` | `bool` |  Nullable |
| `employment_type` | `varchar` |  Nullable |

## Table `education`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `education_id` | `int4` | Primary |
| `user_id` | `uuid` |  |
| `institution_name` | `varchar` |  |
| `start_date` | `date` |  Nullable |
| `end_date` | `date` |  Nullable |
| `education_level` | `varchar` |  Nullable |
| `education_status` | `bool` |  Nullable |
| `major` | `varchar` |  Nullable |
| `details` | `text` |  Nullable |

## Table `profiles`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `profile_id` | `int4` | Primary |
| `user_id` | `uuid` |  Unique |
| `specialization` | `varchar` |  Nullable |
| `overview` | `text` |  Nullable |
| `profile_pic_url` | `text` |  Nullable |

</details>
<br>  
  
## 🔐 Authentication

The authentication system is responsible for securely registering users,
verifying their credentials, and issuing authentication tokens.   
### 1- Registration
Users can create an account by providing their basic information.

The registration process includes:
- Validating required fields.
- Validating email format.
- Checking username and email uniqueness.
- Validating password strength.
- Hashing the password using Argon2.
- Storing the user data in PostgreSQL.

### 2- Login
Users can authenticate using their username/email and password.
The login process includes:

- Validating the provided credentials.
- Retrieving the user from the database.
- Verifying the password against the stored ``Argon2 hash``.
- Generating a ``JWT`` after successful authentication.

### 3- JWT Authentication
After a successful login, the server generates a JWT containing the
authenticated user's identifier.
The token is later used to authenticate requests to protected endpoints.

### 4-  Authentication Middleware



