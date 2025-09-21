const profileInfo = document.getElementById('profile-info');
const logoutBtn = document.getElementById('logout');
const prevBtn = document.getElementById('prev-category');
const nextBtn = document.getElementById('next-category');
const submitBtn = document.getElementById('submit-checklist');
const checklistContainer = document.getElementById('checklist');
const currentCategoryNameDiv = document.getElementById('current-category-name');

// Checklist data
const checklistData = {
  essential: [
    "Lightweight, breathable clothes (cotton, linen)",
    "Raincoat or umbrella (especially for monsoon season)",
    "Comfortable sandals or walking shoes",
    "Basic toiletries and personal medications",
    "Insect/mosquito repellent",
    "Sunscreen (SPF 30+ recommended)",
    "Hat and sunglasses",
    "Travel documents (ID, tickets, hotel details)",
    "Reusable water bottle",
    "Local currency and debit/credit card",
    "Adapter (Type D or C plugs)",
    "Phone and charger/power bank",
    "Swimwear for resorts or beaches"
  ],
  optional: [
    "Workout/activewear",
    "Evening outfits (dinners, events)",
    "Small first aid kit",
    "Books/e-reader",
    "Camera"
  ],
  hand: [
    "Passport and boarding passes",
    "Travel insurance documents",
    "Essential medications",
    "Change of clothes",
    "Sanitizer and antibacterial wipes"
  ]
};

// Get current user
const currentUser = localStorage.getItem('currentUser');

if (!currentUser) {
  window.location.href = 'login.html';
}

profileInfo.textContent = `Hello, ${currentUser}`;

// Storage key for checklist data per user
const STORAGE_KEY = `checklist_${currentUser}`;

function loadChecklistState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : {};
}

function saveChecklistState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let currentCategoryIndex = 0;
const categoryOrder = ['essential', 'optional', 'hand'];

function updateCategoryName() {
  const categoryMap = {
    essential: "Essential Items",
    optional: "Optional Extras",
    hand: "Hand Luggage"
  };
  currentCategoryNameDiv.textContent = categoryMap[categoryOrder[currentCategoryIndex]];
}

function updateButtons() {
  prevBtn.disabled = (currentCategoryIndex === 0);
  nextBtn.disabled = (currentCategoryIndex === categoryOrder.length - 1);
}

function renderChecklist(category) {
  checklistContainer.innerHTML = '';
  const list = document.createElement('ul');
  const savedState = loadChecklistState();
  const categoryState = savedState[category] || [];

  checklistData[category].forEach((item, index) => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `${category}_item_${index}`;
    checkbox.checked = !!categoryState[index];

    checkbox.addEventListener('change', () => {
      categoryState[index] = checkbox.checked;
      savedState[category] = categoryState;
      saveChecklistState(savedState);
    });

    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = item;

    li.appendChild(checkbox);
    li.appendChild(label);
    list.appendChild(li);
  });

  checklistContainer.appendChild(list);
}

function renderCurrentCategory() {
  const category = categoryOrder[currentCategoryIndex];
  renderChecklist(category);
  updateCategoryName();
  updateButtons();
}

prevBtn.addEventListener('click', () => {
  if (currentCategoryIndex > 0) {
    currentCategoryIndex--;
    renderCurrentCategory();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentCategoryIndex < categoryOrder.length - 1) {
    currentCategoryIndex++;
    renderCurrentCategory();
  }
});

submitBtn.addEventListener('click', () => {
  alert(`Checklist saved for profile: ${currentUser}`);
  window.location.href = 'profile.html';
});

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
});

// Initialize the dashboard view
renderCurrentCategory();
