const form = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const profileList = document.getElementById('profile-list');

function loadProfiles() {
  const profiles = JSON.parse(localStorage.getItem('profiles') || '[]');
  profileList.innerHTML = '';

  profiles.forEach(name => {
    const li = document.createElement('li');

    const nameSpan = document.createElement('span');
    nameSpan.textContent = name;
    nameSpan.style.cursor = 'pointer';
    nameSpan.style.marginRight = '15px';
    nameSpan.addEventListener('click', () => {
      localStorage.setItem('currentUser', name);
      window.location.href = 'dashboard.html';
    });
    li.appendChild(nameSpan);

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.style.background = '#e74c3c';
    removeBtn.style.color = '#fff';
    removeBtn.style.border = 'none';
    removeBtn.style.padding = '4px 8px';
    removeBtn.style.borderRadius = '5px';
    removeBtn.style.cursor = 'pointer';

    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm(`Remove profile "${name}" and its data?`)) {
        removeProfile(name);
      }
    });
    li.appendChild(removeBtn);

    profileList.appendChild(li);
  });

  if (profiles.length === 0) {
    profileList.innerHTML = '<p>No profiles found. Create one above.</p>';
  }
}

function removeProfile(name) {
  let profiles = JSON.parse(localStorage.getItem('profiles') || '[]');
  profiles = profiles.filter(p => p !== name);
  localStorage.setItem('profiles', JSON.stringify(profiles));
  localStorage.removeItem(`checklist_${name}`);

  const currentUser = localStorage.getItem('currentUser');
  if (currentUser === name) {
    localStorage.removeItem('currentUser');
  }
  loadProfiles();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  if (!username) return;

  let profiles = JSON.parse(localStorage.getItem('profiles') || '[]');

  if (!profiles.includes(username)) {
    profiles.push(username);
    localStorage.setItem('profiles', JSON.stringify(profiles));
  }

  localStorage.setItem('currentUser', username);
  window.location.href = 'dashboard.html';
});

loadProfiles();
