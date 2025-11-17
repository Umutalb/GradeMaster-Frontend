const API_URL = "https://grademaster-api-8bca374f4b3b.herokuapp.com/api/Grades";

const form = document.getElementById("grade-form");
const resultCard = document.getElementById("result");
const avgSpan = document.getElementById("avg");
const statusSpan = document.getElementById("status");
const commentSpan = document.getElementById("comment");
const errorBox = document.getElementById("error");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorBox.classList.add("hidden");
    resultCard.classList.add("hidden");

    const midterm = Number(document.getElementById("midterm").value);
    const finalExam = Number(document.getElementById("final").value);
    const midtermWeight = Number(document.getElementById("midtermWeight").value);
    const finalWeight = Number(document.getElementById("finalWeight").value);
    const passingGrade = Number(document.getElementById("passingGrade").value);

    const payload = {
        midterm: midterm,
        final: finalExam,
        midtermWeight: midtermWeight,
        finalWeight: finalWeight,
        passingGrade: passingGrade
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error("Request failed with status " + response.status);
        }

        const data = await response.json();
        // Expected GradeResponse fields: Status (bool), Average (number), Comment (string), RequiredFinal (number)

        avgSpan.textContent = data.average?.toFixed ? data.average.toFixed(2) : data.average;
    statusSpan.textContent = data.status ? "Passed" : "Failed";
        statusSpan.className = data.status ? "pass" : "fail";
        commentSpan.textContent = data.comment ?? "";

        resultCard.classList.remove("hidden");
    } catch (err) {
    errorBox.textContent = "Request failed: " + err.message + " (Make sure the API is running and the HTTPS certificate is trusted)";
        errorBox.classList.remove("hidden");
    }
});
