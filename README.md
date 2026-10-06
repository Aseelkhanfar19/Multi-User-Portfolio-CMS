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

## Database Architecture
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

---



  

