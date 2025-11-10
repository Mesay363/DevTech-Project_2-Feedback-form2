document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const feedbackForm = document.getElementById('feedbackForm');
    const thankYouContainer = document.getElementById('thankYouContainer');
    const newFeedbackBtn = document.getElementById('newFeedbackBtn');
    const submitBtn = document.getElementById('submitBtn');
    const charCount = document.getElementById('charCount');
    const messageTextarea = document.getElementById('message');

    // Error elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    // Character counter
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count;
            
            if (count > 450) {
                charCount.style.color = '#e74c3c';
            } else if (count > 300) {
                charCount.style.color = '#f39c12';
            } else {
                charCount.style.color = '#27ae60';
            }
        });
    }

    // Form validation functions
    function validateName() {
        const name = document.getElementById('name').value.trim();
        if (!name) {
            showError(nameError, 'Please enter your name');
            return false;
        }
        if (name.length < 2) {
            showError(nameError, 'Name must be at least 2 characters long');
            return false;
        }
        clearError(nameError);
        return true;
    }

    function validateEmail() {
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            showError(emailError, 'Please enter your email address');
            return false;
        }
        if (!emailRegex.test(email)) {
            showError(emailError, 'Please enter a valid email address');
            return false;
        }
        clearError(emailError);
        return true;
    }

    function validateMessage() {
        const message = document.getElementById('message').value.trim();
        if (!message) {
            showError(messageError, 'Please enter your feedback message');
            return false;
        }
        if (message.length < 10) {
            showError(messageError, 'Message must be at least 10 characters long');
            return false;
        }
        if (message.length > 500) {
            showError(messageError, 'Message must be less than 500 characters');
            return false;
        }
        clearError(messageError);
        return true;
    }

    function showError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function clearError(errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }

    // Real-time validation
    document.getElementById('name').addEventListener('blur', validateName);
    document.getElementById('email').addEventListener('blur', validateEmail);
    document.getElementById('message').addEventListener('blur', validateMessage);

    // Clear errors on input
    document.getElementById('name').addEventListener('input', () => clearError(nameError));
    document.getElementById('email').addEventListener('input', () => clearError(emailError));
    document.getElementById('message').addEventListener('input', () => clearError(messageError));

    // Form submission
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isEmailValid && isMessageValid) {
            submitForm();
        }
    });

    function submitForm() {
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value.trim(),
            rating: document.querySelector('input[name="rating"]:checked')?.value || 'Not rated'
        };

        console.log('Form data to be submitted:', formData);

        // Simulate API call (2 seconds delay)
        setTimeout(() => {
            // Show thank you message
            thankYouContainer.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            
            // Reset form and button state
            feedbackForm.reset();
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            charCount.textContent = '0';
            charCount.style.color = '#27ae60';
            
        }, 2000);
    }

    // New feedback button
    newFeedbackBtn.addEventListener('click', function() {
        // Hide thank you message
        thankYouContainer.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });

    // Close thank you message when clicking outside
    thankYouContainer.addEventListener('click', function(e) {
        if (e.target === thankYouContainer) {
            thankYouContainer.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close thank you message with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && thankYouContainer.style.display === 'flex') {
            thankYouContainer.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});