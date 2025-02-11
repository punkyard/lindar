// calendar.js
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
let currentYear = 2025;

function changeYear(delta) {
    currentYear += delta;
    document.querySelector('.year-number').textContent = currentYear;
    // On vide et recrée le calendrier
    document.querySelector('.months-container').innerHTML = '';
    document.querySelector('.weekdays').innerHTML = '';
    createWeekdaysHeader();
    createMonthRows();
}

// Ajoute les jours de la semaine dans l'en-tête
function createWeekdaysHeader() {
    const weekdaysDiv = document.querySelector('.weekdays');
    // On crée 42 colonnes (6 semaines * 7 jours) pour être sûr d'avoir assez de place
    for (let i = 0; i < 42; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'weekday';
        dayDiv.textContent = weekdays[i % 7];
        weekdaysDiv.appendChild(dayDiv);
    }
}

// Calcule le nombre de jours dans un mois
function getDaysInMonth(month) {
    return new Date(currentYear, month + 1, 0).getDate();
}

// Calcule le décalage du premier jour du mois
function getFirstDayOffset(month) {
    const day = new Date(currentYear, month, 1).getDay();
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
        
        // On crée 42 colonnes pour avoir 6 semaines complètes
        for (let i = 0; i < 42; i++) {
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
    // Ajouter les écouteurs pour les flèches
    document.querySelectorAll('.year-nav').forEach(nav => {
        nav.addEventListener('click', function() {
            const delta = this.textContent === '<' ? -1 : 1;
            changeYear(delta);
        });
    });
}

// Lance l'initialisation quand la page est chargée
document.addEventListener('DOMContentLoaded', initCalendar);