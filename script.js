const rewardInput = document.getElementById('new-reward');
const addBtn = document.getElementById('add-btn');
const rewardList = document.getElementById('reward-list');

// Load rewards from localStorage
let rewards = JSON.parse(localStorage.getItem('rewards')) || [];

function saveRewards() {
  localStorage.setItem('rewards', JSON.stringify(rewards));
}

function renderRewards() {
  rewardList.innerHTML = '';
  rewards.forEach((reward, index) => {
    const li = document.createElement('li');
    li.textContent = reward.text;
    if(reward.done) li.classList.add('done');

    li.addEventListener('click', () => {
      rewards[index].done = !rewards[index].done;
      saveRewards();
      renderRewards();
    });

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'X';
    removeBtn.className = 'remove-btn';
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      rewards.splice(index,1);
      saveRewards();
      renderRewards();
    });

    li.appendChild(removeBtn);
    rewardList.appendChild(li);
  });
}

// Add new reward
addBtn.addEventListener('click', () => {
  const text = rewardInput.value.trim();
  if(text) {
    rewards.push({text: text, done: false});
    rewardInput.value = '';
    saveRewards();
    renderRewards();
  }
});

// Initial render
renderRewards();

