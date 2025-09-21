const profilesContainer = document.getElementById('profiles-container');

    // Sample human images URLs (you can replace these URLs or self-host images)
    const humanImages = [
      'https://randomuser.me/api/portraits/men/32.jpg',
      'https://randomuser.me/api/portraits/women/44.jpg',
      'https://randomuser.me/api/portraits/men/56.jpg',
      'https://randomuser.me/api/portraits/women/65.jpg',
      'https://randomuser.me/api/portraits/men/71.jpg',
      'https://randomuser.me/api/portraits/women/23.jpg',
      'https://randomuser.me/api/portraits/men/15.jpg',
      'https://randomuser.me/api/portraits/women/12.jpg'
    ];

    function loadProfiles() {
      const profiles = JSON.parse(localStorage.getItem('profiles') || '[]');
      profilesContainer.innerHTML = '';

      profiles.forEach((name, index) => {
        const card = document.createElement('div');
        card.className = 'profile-card';

        const imgDiv = document.createElement('div');
        imgDiv.className = 'profile-image';

        // Assign image deterministically by index (loop if needed)
        const img = document.createElement('img');
        img.src = humanImages[index % humanImages.length];
        img.alt = `${name} Profile Picture`;

        imgDiv.appendChild(img);
        card.appendChild(imgDiv);

        // Profile name
        const profName = document.createElement('div');
        profName.className = 'profile-name';
        profName.textContent = name;
        card.appendChild(profName);

        // Remove button
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', (e) => {
          e.stopPropagation(); // Prevent triggering card click
          if (confirm(`Remove profile "${name}"?`)) {
            removeProfile(name);
          }
        });
        card.appendChild(removeBtn);

        // Clicking card loads that profile into dashboard
        card.addEventListener('click', () => {
          localStorage.setItem('currentUser', name);
          window.location.href = 'dashboard.html';
        });

        profilesContainer.appendChild(card);
      });

      if (profiles.length === 0) {
        profilesContainer.innerHTML = '<p>No saved profiles found.</p>';
      }
    }

    function removeProfile(name) {
      let profiles = JSON.parse(localStorage.getItem('profiles') || '[]');
      profiles = profiles.filter(p => p !== name);
      localStorage.setItem('profiles', JSON.stringify(profiles));

      // Also clear saved checklist for the removed profile (optional)
      localStorage.removeItem(`checklist_${name}`);

      // If the removed profile was current user, remove currentUser key
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser === name) {
        localStorage.removeItem('currentUser');
      }

      loadProfiles();
    }

    loadProfiles();