# Student Management System (Flask + MySQL)

A web-based Student Management System built with **Flask**, **MySQL**, and vanilla **HTML/CSS/JavaScript**.  
This project demonstrates relational database design and CRUD operations with a dynamic frontend using the Fetch API.

---

## Features

- Manage **Students** (create, update, delete, view)
- Manage **Instructors**
- Manage **Courses** (each course is assigned to an instructor)
- Manage **Enrollments** (many-to-many between students and courses)
  - Enroll students in courses  
  - Assign/update grades  
- Dynamic UI updates without full page reloads
- Referential integrity enforced with **foreign keys** and cascading rules

---

## Database Schema

The system uses four main tables:

- **Student**
  - `id (PK)`
  - `name`
  - `credits_earned`

- **Instructor**
  - `id (PK)`
  - `name`
  - `department`

- **Course**
  - `id (PK)`
  - `title`
  - `credit_value`
  - `inst_id (FK → Instructor.id)`

- **Enrollment** (associative entity)
  - `student_id (PK, FK → Student.id)`
  - `course_id (PK, FK → Course.id)`
  - `grade`

Relationships:
- One Instructor → Many Courses  
- Many Students ↔ Many Courses (via Enrollment)

---

## Tech Stack

- **Backend:** Flask (Python)
- **Database:** MySQL (InnoDB)
- **Frontend:** HTML, CSS, Vanilla JavaScript
- **API:** REST-style endpoints (`GET`, `POST`, `PUT`, `DELETE`)

---

## Setup Instructions

### 1️ Clone the repository
``` zsh
'''I use Mac, For Windows use your respective commands'''
1. git clone <your-repo-url>
2. cd <project-folder>
3. python3 -m venv .venv
4. source .venv/bin/activate
5. pip install -r requirements.txt
'''Next Portion is in SQL'''
6. CREATE DATABASE school;
7. USE school;
8. SOURCE DATABASE.sql;
9. Inside the flask app, ensure host=localhost, password='YOUR_PASSWORD', database=school
10. To run the application, run "flask --app test run"
