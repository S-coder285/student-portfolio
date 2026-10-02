document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. DYNAMIC ACADEMIC PLANNER SYSTEM
  // ==========================================
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');

  // Array to manage global planner data state
  let tasks = [];

  if (addTaskBtn && taskInput && taskList) {
    const renderTasks = () => {
      taskList.innerHTML = ''; // Empty standard layout DOM node container

      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;

        li.innerHTML = `
                  <span>${task.text}</span>
                  <div class="task-actions">
                      <button class="btn-complete" onclick="toggleTask(${index})">✓</button>
                      <button class="btn-delete" onclick="deleteTask(${index})">✗</button>
                  </div>
              `;
        taskList.appendChild(li);
      });
    };

    // Event Handling: Add dynamic task
    addTaskBtn.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText === '') {
        alert('Task input space cannot be left blank.');
        return;
      }

      tasks.push({ text: taskText, completed: false });
      taskInput.value = ''; // Reset form item input field
      renderTasks();
    });

    // DOM Manipulation functions mapped directly onto global window lifecycle
    window.toggleTask = (index) => {
      tasks[index].completed = !tasks[index].completed;
      renderTasks();
    };

    window.deleteTask = (index) => {
      tasks.splice(index, 1);
      renderTasks();
    };
  }

  // ==========================================
  // 2. CONTACT FORM ENGINE & INPUT VALIDATION
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const errorSummary = document.getElementById('errorSummary');
  const successMessage = document.getElementById('successMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Stop normal web submission reloads

      const fullName = document.getElementById('fullName').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const message = document.getElementById('message').value.trim();

      let errors = [];
      errorSummary.style.display = 'none';
      successMessage.style.display = 'none';

      // Validation Rule 1: No field is empty
      if (!fullName || !email || !phone || !message) {
        errors.push('All input fields are mandatory and must be populated.');
      }

      // Validation Rule 2: Email format verification via RegEx
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+\$/;
      if (email && !emailRegex.test(email)) {
        errors.push('Please provide a valid structural email address form.');
      }

      // Validation Rule 3: Phone number contains only digits
      const digitsOnlyRegex = /^\d+\$/;
      if (phone && !digitsOnlyRegex.test(phone)) {
        errors.push(
          'Phone number field strictly accepts only digit characters.'
        );
      }

      if (errors.length > 0) {
        errorSummary.innerHTML = errors.join('<br>');
        errorSummary.style.display = 'block';
      } else {
        successMessage.style.display = 'block';
        contactForm.reset(); // Wipe values completely on finish
      }
    });
  }
});
