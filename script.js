document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const responseMessage = document.getElementById('responseMessage');

  const validateField = (field) => {
    const errorMessage = field.nextElementSibling;
    if (!field.checkValidity()) {
      errorMessage.textContent = field.validationMessage;
      errorMessage.style.display = 'block';
      return false;
    } else {
      errorMessage.textContent = '';
      errorMessage.style.display = 'none';
      return true;
    }
  };

  const validateForm = () => {
    const fields = contactForm.querySelectorAll('input, textarea');
    let isValid = true;
    fields.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });
    return isValid;
  };

  contactForm.addEventListener('input', (event) => {
    validateField(event.target);
  });

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validateForm()) {
      responseMessage.textContent = 'Please correct the errors in the form.';
      responseMessage.style.color = 'red';
      return;
    }

    const formData = new FormData(contactForm);
    const formObj = Object.fromEntries(formData.entries());
    responseMessage.textContent = 'Submitting...';
    responseMessage.style.color = 'black';

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formObj)
    })
    .then(response => response.json())
    .then(data => {
      responseMessage.textContent = 'Form submitted successfully!';
      responseMessage.style.color = 'green';
      contactForm.reset();
    })
    .catch(error => {
      responseMessage.textContent = 'Error submitting form.';
      responseMessage.style.color = 'red';
    });
  });
});
