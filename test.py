from flask import Flask, render_template, jsonify, request
from flask import g
import mysql.connector
from mysql.connector.pooling import MySQLConnectionPool

app = Flask(__name__)
pool = MySQLConnectionPool(
    pool_name="school_pool",
    pool_size=5,
    host="127.0.0.1",
    user="root",
    password="Wakari12!",
    database="school",
    autocommit=True
)

def get_db():
    if "db" not in g:
        g.db = pool.get_connection()
    return g.db

@app.teardown_appcontext
def close_db(_exc):
    db = g.pop("db", None)
    if db is not None:
        db.close()


@app.route("/add-student", methods=["POST"])
def add_student():
    db = get_db()
    cursor = db.cursor()

    data = request.get_json()
    student_name = data["name"]
    student_credits = data["credits"]

    sql = """
    INSERT INTO Student (name, credits) 
    VALUES (%s, %s)
    """

    values = (student_name, student_credits)

    cursor.execute(sql, values)
    cursor.close()

    return "Student added successfully!", 201

@app.route("/add-instructor", methods=["POST"])
def add_instructor():
    db = get_db()
    cursor = db.cursor()

    data = request.get_json()
    instructor_name = data["name"]
    instructor_department = data["department"]

    sql = """
    INSERT INTO Instructor (name, department) 
    VALUES (%s, %s)
    """

    values = (instructor_name, instructor_department)

    cursor.execute(sql, values)
    cursor.close()

    return "Instructor added successfully!", 201

@app.route("/add-course", methods=["POST"])
def add_course():
    db = get_db()
    cursor = db.cursor()

    data = request.get_json()
    course_name = data["title"]
    instructor_id = data["inst_id"]
    course_credits = data["credits"]

    sql = """
    INSERT INTO Course (title, inst_id, credits) 
    VALUES (%s, %s, %s)
    """

    values = (course_name, instructor_id, course_credits)

    cursor.execute(sql, values)
    cursor.close()

    return "Course added successfully!", 201

@app.route("/add-enrollment", methods=["POST"])
def add_enrollment():
    db = get_db()
    cursor = db.cursor()

    data = request.get_json()
    student_id = data["student_id"]
    course_id = data["course_id"]
    grade = data["grade"]

    if student_id is None or course_id is None:
        return jsonify({"ok": False, "error": "student_id and course_id are required fields."}), 400
    
    try:
        sql = """
        INSERT INTO Enrollment (student_id, course_id, grade) 
        VALUES (%s, %s, %s)
        """
        values = (student_id, course_id, grade)

        cursor.execute(sql, values)
    except mysql.connector.IntegrityError as e:
        return jsonify({"ok": False, "error": str(e)}), 400

    cursor.close()

    return jsonify({"ok": True}), 201

@app.route("/get-students")
def get_students():
    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute("SELECT ID, name, credits FROM Student")
    students = cursor.fetchall()

    if not students:
        return jsonify([]), 200

    cursor.close()

    return jsonify({"students" : students})

@app.route("/get-instructors")
def get_instructor():
    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute("SELECT ID, name, department FROM Instructor")
    instructors = cursor.fetchall()

    if not instructors:
        return jsonify([]), 200

    cursor.close()

    return jsonify({"instructors" : instructors})

@app.route("/get-courses")
def get_courses():
    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute("SELECT ID, title, inst_id, credits FROM Course")
    courses = cursor.fetchall()

    if not courses:
        return jsonify([]), 200

    cursor.close()

    return jsonify({"courses" : courses})

@app.route("/get-enrollments")
def get_enrollments():
    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            e.student_id,
            s.name AS student_name,
            e.course_id,
            c.title AS course_title,
            e.grade
        FROM Enrollment e
        JOIN Student s ON e.student_id = s.ID
        JOIN Course c ON e.course_id = c.ID
        ORDER BY e.student_id, e.course_id
    """)
    enrollments = cursor.fetchall()

    if not enrollments:
        return jsonify([]), 200

    cursor.close()

    return jsonify({"enrollments" : enrollments})

@app.delete("/delete-student/<int:student_id>")
def delete_student(student_id):
    db = get_db()
    cursor = db.cursor()

    sql = "DELETE FROM Student WHERE ID = %s"
    cursor.execute(sql, (student_id,))
    deleted = cursor.rowcount;
    db.commit();

    cursor.close()

    if deleted == 0:
        return jsonify({"ok": False,"message": f"No student found with ID {student_id}."}), 404

    return jsonify({"ok": True, "message": f"Student with ID {student_id} deleted successfully."}), 200

@app.delete("/delete-instructor/<int:instructor_id>")
def delete_instructor(instructor_id):
    db = get_db()
    cursor = db.cursor()

    sql = "DELETE FROM Instructor WHERE ID = %s"
    cursor.execute(sql, (instructor_id,))
    deleted = cursor.rowcount;
    db.commit();

    cursor.close()

    if deleted == 0:
        return jsonify({"ok": False,"message": f"No instructor found with ID {instructor_id}."}), 404

    return jsonify({"ok": True, "message": f"Instructor with ID {instructor_id} deleted successfully."}), 200

@app.delete("/delete-course/<int:course_id>")
def delete_course(course_id):
    db = get_db()
    cursor = db.cursor()

    sql = "DELETE FROM Course WHERE ID = %s"
    cursor.execute(sql, (course_id,))
    deleted = cursor.rowcount;
    db.commit();

    cursor.close()

    if deleted == 0:
        return jsonify({"ok": False,"message": f"No course found with ID {course_id}."}), 404

    return jsonify({"ok": True, "message": f"Course with ID {course_id} deleted successfully."}), 200

@app.delete("/delete-enrollment/<int:student_id>/<int:course_id>")
def delete_enrollment(student_id, course_id):
    db = get_db()
    cursor = db.cursor()

    sql = """
    DELETE FROM Enrollment
    WHERE student_id = %s and course_id = %s"""

    cursor.execute(sql, (student_id, course_id))
    deleted = cursor.rowcount;

    if deleted == 0:
        return jsonify({"ok": False,"message": f"No enrollment found for student ID {student_id} and course ID {course_id}."}), 404
    db.commit();
    cursor.close()

    return jsonify({"ok": True, "message": f"Enrollment for student ID {student_id} and course ID {course_id} deleted successfully."}), 200


@app.put("/update-student/<int:student_id>")
def update_student(student_id):
    db = get_db()
    cursor = db.cursor()

    data = request.get_json(silent=True)

    allowed_fields = {
        "name": str,
        "credits": int
    }

    updates = []
    values = []

    for field, field_type in allowed_fields.items():
        if field in data:
            value = data[field]

            if not isinstance(value, field_type):
                return jsonify({"ok": False, "message": f"Field {field} must be of type {field_type.__name__}"}), 400
            
            updates.append(f"{field} = %s")
            values.append(value)

    if not updates:
        return jsonify({"ok": False, "message": "No valid fields to update."}), 400
        
    sql = f"""
    UPDATE Student SET {", ".join(updates)}
    WHERE ID = %s
    """
    values.append(student_id)

    cursor.execute(sql, values)
    db.commit()
    updated = cursor.rowcount
    cursor.close()

    if updated == 0:
        return jsonify({"ok": False, "message": f"No student found with ID {student_id}."}), 404
    return jsonify({"ok": True, "message": f"Student with ID {student_id} updated successfully."}), 200

@app.put("/update-instructor/<int:instructor_id>")
def update_instructor(instructor_id):
    db = get_db()
    cursor = db.cursor()

    data = request.get_json(silent=True)

    allowed_fields = {
        "name": str,
        "department": str
    }

    updates = []
    values = []

    for field, field_type in allowed_fields.items():
        if field in data:
            value = data[field]

            if not isinstance(value, field_type):
                return jsonify({"ok": False, "message": f"Field {field} must be of type {field_type.__name__}"}), 400
            
            updates.append(f"{field} = %s")
            values.append(value)

    if not updates:
        return jsonify({"ok": False, "message": "No valid fields to update."}), 400
        
    sql = f"""
    UPDATE Instructor SET {", ".join(updates)}
    WHERE ID = %s
    """
    values.append(instructor_id)

    cursor.execute(sql, values)
    db.commit()
    updated = cursor.rowcount
    cursor.close()

    if updated == 0:
        return jsonify({"ok": False, "message": f"No instructor found with ID {instructor_id}."}), 404
    
    return jsonify({"ok": True, "message": f"Instructor with ID {instructor_id} updated successfully."}), 200


@app.put("/update-course/<int:course_id>")
def update_course(course_id):
    db = get_db()
    cursor = db.cursor()

    data = request.get_json(silent=True)

    allowed_fields = {
        "title": str,
        "inst_id": int,
        "credits": int
    }

    updates = []
    values = []

    for field, field_type in allowed_fields.items():
        if field in data:
            value = data[field]

            if not isinstance(value, field_type):
                return jsonify({"ok": False, "message": f"Field {field} must be of type {field_type.__name__}"}), 400
            
            updates.append(f"{field} = %s")
            values.append(value)

    if not updates:
        return jsonify({"ok": False, "message": "No valid fields to update."}), 400
        
    sql = f"""
    UPDATE Course SET {", ".join(updates)}
    WHERE ID = %s
    """
    values.append(course_id)

    cursor.execute(sql, values)
    db.commit()
    updated = cursor.rowcount
    cursor.close()

    if updated == 0:
        return jsonify({"ok": False, "message": f"No course found with ID {course_id}."}), 404
    
    return jsonify({"ok": True, "message": f"Course with ID {course_id} updated successfully."}), 200

@app.put("/update-enrollment/<int:student_id>/<int:course_id>")
def update_enrollment(student_id, course_id):
    db = get_db()
    cursor = db.cursor()

    data = request.get_json(silent=True)

    allowed_fields = {
        "student_id": int,
        "course_id": int,
        "grade": str
    }

    updates = []
    values = []

    for field, field_type in allowed_fields.items():
        if field in data:
            value = data[field]

            if not isinstance(value, field_type):
                return jsonify({"ok": False, "message": f"Field {field} must be of type {field_type.__name__}"}), 400
            
            updates.append(f"{field} = %s")
            values.append(value)

    if not updates:
        return jsonify({"ok": False, "message": "No valid fields to update."}), 400
        
    sql = f"""
    UPDATE Enrollment SET {", ".join(updates)}
    WHERE student_id = %s and course_id = %s
    """
    values.append(student_id)
    values.append(course_id)

    cursor.execute(sql, values)
    db.commit()
    updated = cursor.rowcount
    cursor.close()

    if updated == 0:
        return jsonify({"ok": False, "message": f"No enrollment found for student ID {student_id} and course ID {course_id}."}), 404
    
    return jsonify({"ok": True, "message": f"Enrollment for student ID {student_id} and course ID {course_id} updated successfully."}), 200

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
