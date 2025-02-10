// calendar.js
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const weekdays = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];

// Ajoute les jours de la semaine dans l'en-tête
function createWeekdaysHeader() {
    const weekdaysDiv = document.querySelector('.weekdays');
    for (let i = 0; i < 31; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'weekday';
        dayDiv.textContent = weekdays[i % 7];
        weekdaysDiv.appendChild(dayDiv);
    }
}

// Calcule le nombre de jours dans un mois
function getDaysInMonth(month) {
    return new Date(2025, month + 1, 0).getDate();
}

// Calcule le décalage du premier jour du mois
function getFirstDayOffset(month) {
    const day = new Date(2025, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
}

// Crée les lignes des mois
function createMonthRows() {
    const container = document.querySelector('.months-container');
    
    months.forEach((month, monthIndex) => {
        const monthRow = document.createElement('div');
        monthRow.className = 'month-row';
        
        // Nom du mois
        const monthName = document.createElement('div');
        monthName.className = 'month-name';
        monthName.textContent = month;
        monthRow.appendChild(monthName);
        
        // Jours du mois
        const daysDiv = document.createElement('div');
        daysDiv.className = 'days';
        
        const daysInMonth = getDaysInMonth(monthIndex);
        const firstDayOffset = getFirstDayOffset(monthIndex);
        
        for (let i = 0; i < 31; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'day';
            if (i >= firstDayOffset && (i - firstDayOffset + 1) <= daysInMonth) {
                dayDiv.textContent = i - firstDayOffset + 1;
            }
            daysDiv.appendChild(dayDiv);
        }
        
        monthRow.appendChild(daysDiv);
        container.appendChild(monthRow);
    });
}

// Initialise le calendrier
function initCalendar() {
    createWeekdaysHeader();
    createMonthRows();
}

// Lance l'initialisation quand la page est chargée
document.addEventListener('DOMContentLoaded', initCalendar);