// Notifications Component
function initNotifications() {
    const notificationContainer = document.querySelector('.notification-container');
    if (!notificationContainer) return;
    
    // Sample notifications data
    const notifications = [
        { 
            type: "assessment", 
            title: "New Python Assessment Available", 
            description: "Take the new Python Data Science assessment to improve your skill rating.",
            time: "2 hours ago" 
        },
        { 
            type: "job", 
            title: "Job Trend Alert", 
            description: "15% increase in Full Stack Developer jobs.",
            time: "Yesterday" 
        },
        { 
            type: "course", 
            title: "New Course Recommendation", 
            description: "We recommend \"Advanced JavaScript Patterns\" course.",
            time: "3 days ago" 
        }
    ];
    
    // Update notifications in the UI
    updateNotifications(notifications);
}

// This function can be called from dashboard.js
function updateNotifications(notifications) {
    const notificationsList = document.getElementById('notifications-list');
    if (!notificationsList) return;
    
    let notificationsHTML = '';
    
    notifications.forEach(notification => {
        let iconClass = '';
        let bgClass = '';
        
        switch(notification.type) {
            case 'assessment':
                iconClass = 'text-blue-600';
                bgClass = 'bg-blue-100';
                break;
            case 'job':
                iconClass = 'text-green-600';
                bgClass = 'bg-green-100';
                break;
            case 'course':
                iconClass = 'text-yellow-600';
                bgClass = 'bg-yellow-100';
                break;
            default:
                iconClass = 'text-gray-600';
                bgClass = 'bg-gray-100';
        }
        
        notificationsHTML += `
            <div class="flex items-start p-3 bg-gray-50 rounded-lg mb-3">
                <div class="flex-shrink-0 ${bgClass} rounded-full p-2 mr-3">
                    <svg class="h-5 w-5 ${iconClass}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        ${getNotificationIcon(notification.type)}
                    </svg>
                </div>
                <div>
                    <h3 class="text-sm font-medium text-gray-800">${notification.title}</h3>
                    <p class="text-xs text-gray-600 mt-1">${notification.description}</p>
                    <div class="flex mt-2">
                        <button class="text-xs text-indigo-600 hover:text-indigo-800 font-medium mr-3">View Details</button>
                        <button class="text-xs text-gray-500 hover:text-gray-700">Dismiss</button>
                    </div>
                </div>
                <div class="ml-auto text-xs text-gray-500">${notification.time}</div>
            </div>
        `;
    });
    
    notificationsList.innerHTML = notificationsHTML;
}

function getNotificationIcon(type) {
    switch(type) {
        case 'assessment':
            return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>';
        case 'job':
            return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>';
        case 'course':
            return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>';
        default:
            return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>';
    }
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', initNotifications);