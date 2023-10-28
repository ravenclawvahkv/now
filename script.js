document.addEventListener("DOMContentLoaded", function () {
    const calendar = document.getElementById("calendar");
    const nextMonthButton = document.getElementById("next-month");

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

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
            calendar.appendChild(dayElement);
        }
    }

    generateMonthlyCalendar(currentYear, currentMonth);

    nextMonthButton.addEventListener("click", function () {
        currentMonth = (currentMonth + 1) % 12;
        if (currentMonth === 0) {
            currentYear++;
        }
        generateMonthlyCalendar(currentYear, currentMonth);
    });
});
