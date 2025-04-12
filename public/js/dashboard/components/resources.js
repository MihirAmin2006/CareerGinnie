function renderResources() {
    return `
        <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Career Resources</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div class="border rounded-lg p-5 hover:shadow-md transition-shadow">
                    <h3 class="text-xl font-semibold mb-3">Learning Paths</h3>
                    <p class="text-gray-600 mb-4">Curated courses and tutorials to help you advance your skills.</p>
                    <div class="space-y-3">
                        ${renderResourceItem('Web Development Fundamentals', '12 courses', 'beginner')}
                        ${renderResourceItem('Advanced JavaScript', '8 courses', 'intermediate')}
                        ${renderResourceItem('Data Science Essentials', '10 courses', 'beginner')}
                    </div>
                </div>
                
                <div class="border rounded-lg p-5 hover:shadow-md transition-shadow">
                    <h3 class="text-xl font-semibold mb-3">Interview Preparation</h3>
                    <p class="text-gray-600 mb-4">Resources to help you ace your next interview.</p>
                    <div class="space-y-3">
                        ${renderResourceItem('Behavioral Interview Questions', '50+ examples', 'all-levels')}
                        ${renderResourceItem('Technical Interview Guide', 'Comprehensive guide', 'intermediate')}
                        ${renderResourceItem('Salary Negotiation Tips', 'Expert advice', 'all-levels')}
                    </div>
                </div>
            </div>
            
            <div class="mb-8">
                <h3 class="text-xl font-semibold mb-4">Recommended Articles</h3>
                <div class="space-y-4">
                    ${renderArticleCard(
                        'How to Stand Out in a Competitive Job Market',
                        'Learn strategies to differentiate yourself from other candidates and make a lasting impression.',
                        '5 min read'
                    )}
                    ${renderArticleCard(
                        'The Future of Work: Skills That Will Matter in 2023',
                        'Discover which skills employers will value most in the coming years and how to develop them.',
                        '7 min read'
                    )}
                    ${renderArticleCard(
                        'Mastering Remote Work: Tips for Productivity and Balance',
                        'Practical advice for staying productive and maintaining work-life balance in a remote environment.',
                        '6 min read'
                    )}
                </div>
            </div>
            
            <div>
                <h3 class="text-xl font-semibold mb-4">Upcoming Webinars</h3>
                <div class="space-y-4">
                    ${renderWebinarCard(
                        'Networking in the Digital Age',
                        'May 15, 2023 • 2:00 PM EST',
                        'John Smith, Career Coach'
                    )}
                    ${renderWebinarCard(
                        'Building a Personal Brand on LinkedIn',
                        'May 22, 2023 • 1:00 PM EST',
                        'Sarah Johnson, LinkedIn Specialist'
                    )}
                </div>
            </div>
        </div>
    `;
}

function renderResourceItem(title, subtitle, level) {
    let levelClass = 'bg-green-100 text-green-800';
    if (level === 'intermediate') levelClass = 'bg-yellow-100 text-yellow-800';
    if (level === 'advanced') levelClass = 'bg-red-100 text-red-800';
    
    return `
        <div class="flex items-center justify-between">
            <div>
                <h4 class="font-medium text-gray-800">${title}</h4>
                <p class="text-sm text-gray-500">${subtitle}</p>
            </div>
            <div>
                <span class="px-2 py-1 rounded-full text-xs ${levelClass}">${level}</span>
            </div>
        </div>
    `;
}

function renderArticleCard(title, description, readTime) {
    return `
        <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h4 class="font-semibold text-gray-800 mb-2">${title}</h4>
            <p class="text-sm text-gray-600 mb-3">${description}</p>
            <div class="flex justify-between items-center">
                <span class="text-xs text-gray-500">${readTime}</span>
                <button class="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Read Article</button>
            </div>
        </div>
    `;
}

function renderWebinarCard(title, date, presenter) {
    return `
        <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex justify-between">
                <div>
                    <h4 class="font-semibold text-gray-800 mb-1">${title}</h4>
                    <p class="text-sm text-gray-500 mb-1">${date}</p>
                    <p class="text-xs text-gray-600">${presenter}</p>
                </div>
                <button class="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 h-fit text-sm">
                    Register
                </button>
            </div>
        </div>
    `;
}