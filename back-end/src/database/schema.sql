CREATE TABLE users (
    user_id UUID PRIMARY KEY ,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(300) NOT NULL UNIQUE,
    fisrt_name VARCHAR(120) NOT NULL ,
    last_name VARCHAR(120) NOT NULL ,
    password_hash TEXT NOT NULL 
);

CREATE TABLE projects(
    project_id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    project_name VARCHAR(255) NOT NULL,
    details TEXT ,
    photo_url TEXT ,
    start_date DATE NOT NULL ,
    finished_date DATE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,  --TIMESTAMPTZ more flexible to all times zone while TIMESTAMP not
    project_status VARCHAR(50) CHECK (project_status IN ('In Progress','Ended','Declined')),
    features TEXT,
    single_project BOOLEAN NOT NULL,
    pinned BOOLEAN,

    CONSTRAINT fk_user_project FOREIGN KEY(user_id) REFERENCES users(user_id) 
);

CREATE TABLE technologies(
    tech_id SERIAL PRIMARY KEY,
    tech_name VARCHAR(80) NOT NULL
);

CREATE TABLE projects_tech(
    proj_tech_id serial PRIMARY KEY,
    project_id UUID NOT NULL,
    tech_id SERIAL NOT NULL,

    CONSTRAINT fk_proj_id FOREIGN KEY (project_id) REFERENCES projects(project_id),
    CONSTRAINT fk_tech_id FOREIGN KEY (tech_id) REFERENCES technologies(tech_id)

);

CREATE TABLE users_skills(
    skill_id SERIAL PRIMARY KEY ,
    user_id UUID NOT NULL , 
    tech_id SERIAL NOT NULL,

    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_user_tech_id FOREIGN KEY (tech_id) REFERENCES technologies(tech_id)
);


CREATE TABLE projects_links(
    proj_url_id SERIAL PRIMARY KEY,
    proj_id UUID NOT NULL ,
    label VARCHAR(100) NOT NULL,
    url TEXT NOT NULL,

    CONSTRAINT fk_proj_links_id FOREIGN KEY (proj_id) REFERENCES projects(project_id)
);


CREATE TABLE social_links(
    social_url_id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL ,
    label VARCHAR(100) NOT NULL,
    url TEXT NOT NULL,

    CONSTRAINT fk_user_social_links FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE  work_experience(
    exp_id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL ,
    company_name VARCHAR(120) NOT NULL,
    jop_title VARCHAR(80) ,
    start_date DATE NOT NULL,
    end_date DATE,
    details TEXT,
    is_current BOOLEAN DEFAULT FALSE,
    employment_type VARCHAR(80) CHECK (employment_type IN ('Full Time','Part Time','Internship','Freelancer','Contract','Temporary','Volunteer','Apprenticeship')),

    CONSTRAINT fk_user_exp FOREIGN KEY (user_id) REFERENCES users(user_id)


);


CREATE TABLE education(
    education_id SERIAL PRIMARY KEY ,
    user_id UUID NOT NULL,
    institution_name VARCHAR(80) NOT NULL,
    start_date DATE,
    end_date DATE,
    education_level VARCHAR(80)
    CHECK (
    education_level IN (
        'High School',
        'College',
        'University',
        'Vocational',
        'Bootcamp',
        'Certification',
        'Course',
        'Other'
        )
    ),
    education_status BOOLEAN DEFAULT FALSE,
    major VARCHAR(80) ,
    details TEXT ,

    CONSTRAINT fk_user_edu FOREIGN KEY (user_id) REFERENCES users(user_id)

);

-- Create profiles table
CREATE TABLE profiles(
    profile_id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE,
    specialization VARCHAR(120),
    overview TEXT,
    -- added image url later

    CONSTRAINT fk_user_profile FOREIGN KEY (user_id) REFERENCES users(user_id)


);





 -- Create indexes to enable fast searching 


 -- Create Index on FK of user_id
 -- ------------------------------------------------

CREATE INDEX idx_proj_user_id ON projects(user_id);

CREATE INDEX idx_skills_user_id ON users_skills(user_id);

CREATE INDEX idx_edu_user_id ON education(user_id);

CREATE INDEX idx_exp_user_id ON work_experience(user_id);


-- Create Indexes on FK of project_id
-- --------------------------------------------------

CREATE INDEX idx_proj_techs_proj_id ON projects_tech(project_id);

CREATE INDEX idx_proj_url_id ON projects_links(proj_id);



-- Create policies 
create policy "Public can view this table data" -- name of policy


on "public"."projects"


as PERMISSIVE --If we have many policies and need it to be executable if one of them is true 


for SELECT -- only they can get info from table , they cannot update , delete or insert


to anon -- anonymous people , not authenticated / logged in 


using  -- The condition that let the anon read a specific row  / which row this user can see or use
(
true   -- true  means all rows can be appears to public
);


create policy "Authenticated users can see and control their projects"

on "public"."projects"

as PERMISSIVE

for ALL

to authenticated

using (


) with check ( --any updated row or inserted row should be belong to the current user , don't let the user add or modify other's row

-- Provide a SQL expression for the with check statement

);








-- get all created tables in DB 
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_type = 'BASE TABLE';



 -- get all FK's 
 SELECT
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name,
    tc.constraint_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_schema = 'public'
ORDER BY tc.table_name;