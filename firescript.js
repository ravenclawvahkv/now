document.addEventListener("DOMContentLoaded", function () {
    const calendar = document.getElementById("calendar");
    const prevMonthButton = document.getElementById("prev-month");
    const nextMonthButton = document.getElementById("next-month");
    const selectedDateElement = document.getElementById("selected-date");
    const noteText = document.getElementById("note-text");

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let markedDates = {};

    function generateMonthlyCalendar(year, month) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfWeek = new Date(year, month, 1).getDay();

        // Clear the calendar
        calendar.innerHTML = "";

        // Display the name of the current month
        const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(year, month, 1));

        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        // Add day names
        daysOfWeek.forEach(day => {
            const dayElement = document.createElement("div");
            dayElement.textContent = day;
            calendar.appendChild(dayElement);
        });

        // Add empty cells for the first week
        for (let i = 0; i < firstDayOfWeek; i++) {
            const emptyCell = document.createElement("div");
            calendar.appendChild(emptyCell);
        }

        // Add days
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement("div");
            dayElement.textContent = day;
            dayElement.className = "day";

            // Check if the date is marked
            if (markedDates[`${year}-${month + 1}-${day}`]) {
                dayElement.classList.add("marked");
            }

            // Add click event to the date
            dayElement.addEventListener("click", function () {
                const dateKey = `${year}-${month + 1}-${day}`;
                const markedDate = markedDates[dateKey];

                if (markedDate) {
                    selectedDateElement.textContent = `Notes for ${monthName} ${day}, ${year}`;
                    noteText.value = markedDate.note;
                } else {
                    selectedDateElement.textContent = `Click a date to add or view notes.`;
                    noteText.value = "";
                }
            });

            calendar.appendChild(dayElement);
        }
    }

    generateMonthlyCalendar(currentYear, currentMonth);

    prevMonthButton.addEventListener("click", function () {
        currentMonth = (currentMonth - 1 + 12) % 12;
        if (currentMonth === 11) {
            currentYear--;
        }
        generateMonthlyCalendar(currentYear, currentMonth);
    });

    nextMonthButton.addEventListener("click", function () {
        currentMonth = (currentMonth + 1) % 12;
        if (currentMonth === 0) {
            currentYear++;
        }
        generateMonthlyCalendar(currentYear, currentMonth);
    });

    // Add an event listener to save notes when the textarea changes
    noteText.addEventListener("input", function () {
        const selectedDate = selectedDateElement.textContent;
        if (selectedDate !== "Click a date to add or view notes.") {
            const dateKey = `${currentYear}-${currentMonth + 1}-${parseInt(selectedDate.split(" ")[2])}`;

            if (!markedDates[dateKey]) {
                markedDates[dateKey] = {};
            }

            markedDates[dateKey].note = noteText.value;
        }
    });
});
