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
})