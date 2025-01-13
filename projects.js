document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content-container');
    const closeButton = document.querySelector('.close-button');

    modal.style.display = 'none';

    // Load Navbar and Footer
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => document.getElementById('navbar-placeholder').innerHTML = data)
        .catch(error => console.error('Error loading navbar:', error));

    fetch('footer.html')
        .then(response => response.text())
        .then(data => document.getElementById('footer-placeholder').innerHTML = data)
        .catch(error => console.error('Error loading footer:', error));

    // Load and Sort Projects by Date
    fetch('assets/data/projects-data.json')
        .then(response => response.json())
        .then(data => {
            // Sort projects by dateCompleted (most recent first)
            data.sort((a, b) => new Date(b.dateCompleted) - new Date(a.dateCompleted));

            const projectsContainer = document.getElementById('projects-container');
            data.forEach(project => {
                // Create grid item for each project
                const projectCard = document.createElement('div');
                projectCard.className = 'grid-item';
                projectCard.innerHTML = `
                    <img src="${project.photo}" alt="${project.photoDescription}">
                    <h3>${project.title}</h3>
                    <p><strong>Date Completed:</strong> ${project.dateCompleted}</p>
                `;

                projectCard.addEventListener('click', () => {
                    const carouselItems = project.photos.map(
                        (photo, idx) =>
                            `<div class="carousel-item ${idx === 0 ? 'active' : ''}">
                                <img class="d-block w-100" src="${photo}" alt="${project.photoDescription}">
                            </div>`
                    ).join('');

                    modalContent.innerHTML = `
                        <!-- Carousel -->
                        <div id="carouselExampleIndicators" class="carousel slide mb-4" data-bs-ride="carousel">
                            <div class="carousel-inner">
                                ${carouselItems}
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>

                        <!-- Title -->
                        <h2>${project.title}</h2>

                        <!-- Two-Column Details -->
                        <div class="row">
                            <div class="col-md-6">
                                <p><strong>Location:</strong> ${project.location}</p>
                                <p><strong>Date Completed:</strong> ${project.dateCompleted}</p>
                                <p><strong>Status:</strong> ${project.status}</p>
                                <p><strong>Project Scale:</strong> ${project.projectScale}</p>
                            </div>
                            <div class="col-md-6">
                                <p><strong>Client:</strong> ${project.client}</p>
                                <p><strong>Services Used:</strong> ${project.servicesUsed.join(', ')}</p>
                                <p><strong>Equipment Used:</strong> ${project.equipmentUsed.join(', ')}</p>
                                <p><strong>Challenges Faced:</strong> ${project.challengesFaced}</p>
                                <p><strong>Outcome:</strong> ${project.outcome}</p>
                            </div>
                        </div>

                        <!-- Description and Testimonial -->
                        <div class="description">
                            <h4>Description</h4>
                            <p>${project.description}</p>
                            <blockquote>${project.testimonial}</blockquote>
                        </div>
                    `;
                    modal.style.display = 'flex';
                });

                projectsContainer.appendChild(projectCard);
            });
        })
        .catch(error => console.error('Error loading projects:', error));

    // Close modal on button click
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Close modal on Escape key press
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    });
});
