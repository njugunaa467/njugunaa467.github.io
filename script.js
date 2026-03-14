// Theme Toggle
document.getElementById('themeBtn').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
    if (document.body.classList.contains('light-theme')) {
        this.innerHTML = '🌙 Dark';
    } else {
        this.innerHTML = '☀️ Light';
    }
});

// Experience Tabs
document.querySelectorAll('.exp-tabs .tab-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Deactivate all tab buttons and hide all tab content
        document.querySelectorAll('.exp-tabs .tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.style.display = 'none');

        // Activate clicked tab button and show corresponding content
        this.classList.add('active');
        document.getElementById(this.dataset.exp).style.display = 'block';
    });
});

// Project Filter
document.querySelectorAll('.filter-buttons .btn-filter').forEach(button => {
    button.addEventListener('click', function() {
        const category = this.dataset.category;

        // Deactivate all filter buttons
        document.querySelectorAll('.filter-buttons .btn-filter').forEach(btn => btn.classList.remove('active'));
        // Activate clicked filter button
        this.classList.add('active');

        // Filter projects
        document.querySelectorAll('.project-card').forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Initialize active tab and filter on load
document.addEventListener('DOMContentLoaded', function() {
    // Set initial active experience tab
    const initialExpTab = document.querySelector('.exp-tabs .tab-btn');
    if (initialExpTab) {
        initialExpTab.click();
    }
    // Set initial active project filter
    const initialFilterBtn = document.querySelector('.filter-buttons .btn-filter');
    if (initialFilterBtn) {
        initialFilterBtn.click();
    }
});
