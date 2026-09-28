
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

// Replace this with your own email address
const ownerEmail = "anshulchorghade999@gmail.com";

// Replace this with your WhatsApp number
// Use country code + number, without + or spaces.
// Example format for India: 918788515069
const whatsappNumber = "918788515069";

contactForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const email = document.getElementById("customerEmail").value.trim();
    const message = document.getElementById("customerMessage").value.trim();

    if (!name || !email || !message) {
        formMessage.textContent = "Please fill in all fields.";
        return;
    }

    formMessage.textContent = "Sending your enquiry...";

    const enquiry = {
        name: name,
        email: email,
        message: message,
        _subject: "New Wood Anchor Furniture Enquiry"
    };

    try {
        const response = await fetch(
            `https://formsubmit.co/ajax/${ownerEmail}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(enquiry)
            }
        );

        const result = await response.json();

        if (response.ok && result.success) {
            formMessage.textContent =
                "Enquiry submitted! Opening WhatsApp...";

            const whatsappMessage =
                `Hello Wood Anchor!\n\n` +
                `Name: ${name}\n` +
                `Email: ${email}\n` +
                `Enquiry: ${message}`;

            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=` +
                encodeURIComponent(whatsappMessage);

            window.location.href = whatsappURL;

            contactForm.reset();
        } else {
            formMessage.textContent =
                "Email could not be sent. Please try again.";
        }
    } catch (error) {
        formMessage.textContent =
            "Connection error. Please try again.";
    }
});