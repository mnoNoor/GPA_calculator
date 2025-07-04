document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("addBut");
  const removeAllButton = document.getElementById("removeAllBut");
  const coursesDiv = document.getElementById("courses");
  const totalCreditsEl = document.getElementById("totalCredits");
  const gpaValueEl = document.getElementById("gpaValue");
  const combinedGPAEl = document.getElementById("combinedGPA");

  const courseCredits = {
    CS111: 4,
    MATH101: 4,
    ENGL101: 3,
    PHYS101: 4,
    GIAS: 3,
    CS112: 4,
    MATH102: 4,
    PHYS102: 4,
    ENGL102: 3,
    ENGL201: 3,
    CS351: 4,
    CS201: 3,
    CS211: 4,
    MATH201: 3,
    MATH202: 3,
    STAT232: 3,
    CS224: 3,
    SE262: 3,
    GHAL: 3,
    MATH204: 3,
    CS221: 4,
    SE464: 3,
    SE311: 3,
    SE323: 4,
    SE342: 3,
    CS232: 4,
    SE463: 3,
    SE324: 3,
    SE372: 3,
    SE394: 1,
    SE491: 3,
    SE431: 3,
    SE492: 3,
    GSOS: 3,
    SE472: 3,
  };

  // Add first course automatically
  addCourse();

  addButton.addEventListener("click", () => {
    addCourse();
  });

  removeAllButton.addEventListener("click", () => {
    coursesDiv.innerHTML = "";
    updateResult();
    addCourse();
  });

  function addCourse() {
    const newDiv = document.createElement("div");
    newDiv.classList.add("course");

    newDiv.innerHTML = `
      <input type="text" list="courses_name" class="course-name" placeholder="Course">
      <input type="number" class="credits-input" min="1" step="1" placeholder="Credits">
      <select class="grade">
        <option value="" disabled selected>Grade</option>
        <option value="4.00">A+</option>
        <option value="3.75">A</option>
        <option value="3.50">B+</option>
        <option value="3.00">B</option>
        <option value="2.50">C+</option>
        <option value="2.00">C</option>
        <option value="1.50">D+</option>
        <option value="1.00">D</option>
        <option value="0.00">F</option>
      </select>
      <button type="button" class="remove-btn">×</button>`;

    coursesDiv.appendChild(newDiv);

     // Create datalist if it doesn't exist
    if (!document.getElementById("courses_name")) {
      const datalist = document.createElement("datalist");
      datalist.id = "courses_name";
      Object.keys(courseCredits).forEach((course) => {
        const option = document.createElement("option");
        option.value = course;
        datalist.appendChild(option);
      });
      document.body.appendChild(datalist);
    }

    // Remove a course when click remove button
    const removeButton = newDiv.querySelector(".remove-btn");
    removeButton.addEventListener("click", () => {
      newDiv.remove();
      updateResult();
    });

    const gradeInput = newDiv.querySelector(".grade");
    const courseNameInput = newDiv.querySelector(".course-name");
    const creditsInput = newDiv.querySelector(".credits-input");

    gradeInput.addEventListener("change", updateResult);

    courseNameInput.addEventListener("input", () => {
      const courseName = courseNameInput.value.toUpperCase();
      if (courseCredits[courseName]) {
        creditsInput.value = courseCredits[courseName];
      }
      updateResult();
    });

    creditsInput.addEventListener("input", updateResult);
  }
  
  //update Result automatically
  function updateResult() {
    const prevGPAInput = document.getElementById("prevGPA");
    const prevCreditsInput = document.getElementById("prevCredits");

    const prevGPAValue = parseFloat(prevGPAInput.value) || 0;
    const prevCreditsValue = parseFloat(prevCreditsInput.value) || 0;
    const prevPoints = prevGPAValue * prevCreditsValue;

    let newPoints = 0;
    let newCredits = 0;

    document.querySelectorAll(".course").forEach((course) => {
      const credits = parseFloat(course.querySelector(".credits-input").value);
      const grade = parseFloat(course.querySelector(".grade").value);

      if (
        !isNaN(credits) &&
        !isNaN(grade) &&
        credits > 0 &&
        gradeSelect.value !== ""
      ) {
        newPoints += credits * grade;
        newCredits += credits;
      }
    });

    const newGPA =
      newCredits > 0 ? (newPoints / newCredits).toFixed(2) : "0.00";

    const totalPoints = prevPoints + newPoints;
    const totalCredits = prevCreditsValue + newCredits;

    const combinedGPAValue =
      totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";

    totalCreditsEl.textContent = totalCredits;
    gpaValueEl.textContent = newGPA;
    combinedGPAEl.textContent = combinedGPAValue;
  }
});
