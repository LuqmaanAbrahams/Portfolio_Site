document.addEventListener("DOMContentLoaded", function() {
    // Your code here will execute once the DOM is fully loaded
        let modal = document.getElementById("contact_modal");
        let contact_btn = document.getElementById("contact_btn");
        let ft_contact_btn = document.getElementById("ft_contact_btn");

        contact_btn.addEventListener("click", function () {
            modal.classList.add("show");
        });
        
        ft_contact_btn.addEventListener("click", function () {
            modal.classList.add("show");
        });

        document.addEventListener("click", function (event) {
            let modalContent = document.getElementById("modal_content");
            if (!modalContent.contains(event.target) &&
                !event.target.closest("#contact_btn") &&
                !event.target.closest("#ft_contact_btn")) {
        
                modal.classList.remove("show");
            }
        });

        // Form submission
        const submit_btn = document.getElementById("submit_btn");
        submit_btn.addEventListener("click", async (e) => {
           e.preventDefault();

           const name_input = document.querySelector("#txt_fullname");
           const email_input = document.querySelector("#txt_email");
           const subject_input = document.querySelector("#txt_subject");
           const message_input = document.querySelector("#txt_message");

           const name = name_input.value.trim();
           const email = email_input.value.trim();
           const subject = subject_input.value.trim();
           const message = message_input.value.trim();

           //basic form validation
              if (!name || !email || !subject || !message) {
                alert("All fields are required.");
                return;
              }

            const form_data = {name, email, subject, message};

            const apiURL = 'http://localhost:5000/api/contact'; // Replace with your actual API URL

            try{
                const response = await fetch(apiURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form_data),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    name_input.value = '';
                    email_input.value = '';
                    subject_input.value = '';
                    message_input.value = '';
                    alert("Email sent successfully!");
                } else {
                    const errorData = await response.json();
                    console.error('Error:', errorData);
                    alert("Failed to send email. Please try again later.");
                }
            }
            catch (error) {
                console.error('Error:', error);
                alert("An error occurred. Please try again later.");
            }
        })
        

})