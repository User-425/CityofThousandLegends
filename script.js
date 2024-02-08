// Daily First Open
function dailyOpenChecker() {
    // Get today's date
    const today = new Date().toLocaleDateString();

    // Retrieve data from localStorage or set default values
    let lastOpenedDate = localStorage.getItem('lastOpenedDate');

    // If lastOpenedDate is not today or it's null (first time)
    if (lastOpenedDate !== today || lastOpenedDate === null) {
        console.log("Ready to start your day?");
    } else {
        console.log("Hi again!");
    }

    // Update localStorage with current date and isFirstOpen value
    localStorage.setItem('lastOpenedDate', today);
}

// Call the function
dailyOpenChecker();


// Date and Time Section ------------------
let currentEditIndex = null;

function updateClock() {
    const eventList = JSON.parse(localStorage.getItem('events')) || [];
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('clock').textContent = timeString;
    checkScheduledEvents(eventList);
}

function updateDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString(undefined, options);
    document.getElementById('date').textContent = dateString;

}

function scheduleEvent() {
    const eventName = document.getElementById('createEventName').value;
    const eventDesc = document.getElementById('createEventDescription').value;
    const eventDate = document.getElementById('createEventDate').value;
    const eventTime = document.getElementById('createEventTime').value;
    const eventActivated = document.getElementById('createEventActivated').checked;
    const repeatPattern = document.getElementById('repeatPattern').value;

    if (!eventDate || !eventTime || !eventName) {
        alert('Please enter both event date, time, and name.');
        return;
    }

    const eventList = JSON.parse(localStorage.getItem('events')) || [];
    eventList.push({name: eventName, description: eventDesc, date: eventDate, time: eventTime, activated: eventActivated, repeat: repeatPattern}); 

    localStorage.setItem('events', JSON.stringify(eventList));
    displayEvents();
}


function displayEvents() {
    const eventList = JSON.parse(localStorage.getItem('events')) || [];
    const eventsElement = document.getElementById('events');

    eventsElement.innerHTML = '';

    eventList.forEach((event, index) => {
        const tr = document.createElement('tr');
        tr.className = 'event-item';

        const tdName = document.createElement('td');
        tdName.textContent = event.name;
        tdName.className = 'text-start';

        const tdDesc = document.createElement('td');
        tdDesc.textContent = event.description;

        const tdDate = document.createElement('td');
        tdDate.textContent = event.date;

        const tdTime = document.createElement('td');
        tdTime.textContent = event.time;

        const tdActions = document.createElement('td');

        const editButton = document.createElement('button');
        editButton.className = 'btn btn-warning';
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => openEditModal(index));

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger ml-2';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => openDeleteModal(index));

        const whiteSpace = document.createElement('span');
        whiteSpace.textContent = ' ';

        tdActions.appendChild(editButton);
        tdActions.appendChild(whiteSpace);
        tdActions.appendChild(deleteButton);

        tr.appendChild(tdName);
        tr.appendChild(tdDesc);
        tr.appendChild(tdDate);
        tr.appendChild(tdTime);
        tr.appendChild(tdActions);

        eventsElement.appendChild(tr);
    });

    // Check for events that are due and show notifications
    checkScheduledEvents(eventList);
}

function displayUpcomingEvents() {
    const eventList = JSON.parse(localStorage.getItem('events')) || [];
    const upcomingEventsElement = document.getElementById('upcomingEvents');

    upcomingEventsElement.innerHTML = '';

    const filteredEvents = filterEventsByTimeRange();

    filteredEvents.forEach((event, index) => {
        const eventDateTime = new Date(`${event.date}T${event.time}`);

        // Check if the event date is within the next week and the time is not in the past
        const tr = document.createElement('tr');
        tr.className = 'event-item';

        const tdName = document.createElement('td');
        tdName.textContent = event.name;
        tdName.className = 'text-start';

        const tdDesc = document.createElement('td');
        tdDesc.textContent = event.description;

        const tdDate = document.createElement('td');
        tdDate.textContent = event.date;

        const tdTime = document.createElement('td');
        tdTime.textContent = event.time;

        const tdActions = document.createElement('td');

        const editButton = document.createElement('button');
        editButton.className = 'btn btn-warning';
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => openEditModal(index));

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger ml-2';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => openDeleteModal(index));

        const whiteSpace = document.createElement('span');
        whiteSpace.textContent = ' ';

        tdActions.appendChild(editButton);
        tdActions.appendChild(whiteSpace);
        tdActions.appendChild(deleteButton);

        tr.appendChild(tdName);
        tr.appendChild(tdDesc);
        tr.appendChild(tdDate);
        tr.appendChild(tdTime);
        tr.appendChild(tdActions);

        upcomingEventsElement.appendChild(tr);
    }
    );
}

function filterEventsByTimeRange() {
    const eventList = JSON.parse(localStorage.getItem('events')) || [];
    const timeRangeSelect = document.getElementById('timeRange');
    const selectedTimeRange = timeRangeSelect.value;

    const now = new Date();
    let filterDate;

    switch (selectedTimeRange) {
        case '15mins':
            filterDate = new Date(now.getTime() + 15 * 60000);
            break;
        case '1h':
            filterDate = new Date(now.getTime() + 60 * 60000);
            break;
        case '1d':
            filterDate = new Date(now.getTime() + 24 * 60 * 60000);
            break;
        case '1w':
            filterDate = new Date(now.getTime() + 7 * 24 * 60 * 60000);
            break;
        case '1m':
            filterDate = new Date(now.getTime() + 30 * 7 * 24 * 60 * 60000);
            break;
    }

    // Filter events based on the calculated filter date
    return eventList.filter(event => {
        const eventDateTime = new Date(`${event.date}T${event.time}`);
        return eventDateTime >= now && eventDateTime <= filterDate;
    });
}

function openEditModal(index) {
    currentEditIndex = index;

    const eventList = JSON.parse(localStorage.getItem('events')) || [];
    const event = eventList[index];

    document.getElementById('editEventName').value = event.name;
    document.getElementById('editEventDescription').value = event.description;
    document.getElementById('editEventDate').value = event.date;
    document.getElementById('editEventTime').value = event.time;
    document.getElementById('editEventActivated').checked = event.activated;
    document.getElementById('editRepeatPattern').value = event.repeat;

    $('#editModal').modal('show');

    const editForm = document.getElementById('editForm');
    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        editEvent();
        $('#editModal').modal('hide');
    });
}

function editEvent() {
    const eventList = JSON.parse(localStorage.getItem('events')) || [];
    const event = eventList[currentEditIndex];

    const newName = document.getElementById('editEventName').value;
    const newDesc = document.getElementById('editEventDescription').value;
    const newDate = document.getElementById('editEventDate').value;
    const newTime = document.getElementById('editEventTime').value;
    const newActivated = document.getElementById('editEventActivated').checked;
    const newRepeat = document.getElementById('editRepeatPattern').value;

    if (newDate !== '' && newTime !== '' && newName !== '') {
        event.name = newName;
        event.description = newDesc;
        event.date = newDate;
        event.time = newTime;
        event.activated = newActivated;
        event.repeat = newRepeat;

        localStorage.setItem('events', JSON.stringify(eventList));
        displayEvents();
        displayUpcomingEvents();
    }
}

function openDeleteModal(index) {
    currentEditIndex = index;
    $('#deleteModal').modal('show');
}

function deleteEventConfirmation() {
    const eventList = JSON.parse(localStorage.getItem('events')) || [];
    eventList.splice(currentEditIndex, 1);

    localStorage.setItem('events', JSON.stringify(eventList));
    displayEvents();
    displayUpcomingEvents();

    $('#deleteModal').modal('hide');
}

// Check for events that are due and show notifications
function checkScheduledEvents(eventList) {
    const now = new Date();
    for (let index = 0; index < eventList.length; index++) {
        const event = eventList[index];
        const eventDateTime = new Date(`${event.date}T${event.time}`);

        if ((eventDateTime <= now) && !event.activated) {
            // Event has passed or is within the next minute, show notification
            showNotification('Event Reminder', `Upcoming Event: ${event.name}`);
            event.activated = true;

            localStorage.setItem('events', JSON.stringify(eventList));
            displayEvents();
        } else {
            // console.log("Nothing");
        }
    }
}



// Update the clock every second
setInterval(updateClock, 1000);

// Update the date every minute
setInterval(updateDate, 60000);

// Initial calls to display the clock, date, and events immediately
updateClock();
updateDate();
displayEvents();

// Notification Section --------------

// Function to display a notification
function showNotification(title, body) {
    var options = {
        body: body,
    };

    var notification = new Notification(title, options);

    // You can also handle click events on the notification
    notification.onclick = function () {
        console.log("Notification clicked");
    };
}
