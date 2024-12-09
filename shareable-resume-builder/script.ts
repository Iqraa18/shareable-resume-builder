document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById("name") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const phoneInput = document.getElementById("phone") as HTMLInputElement;
    const summaryInput = document.getElementById("summary") as HTMLTextAreaElement;
    const experienceInput = document.getElementById("experience") as HTMLTextAreaElement;
    const educationInput = document.getElementById("education") as HTMLTextAreaElement;

    const previewName = document.getElementById("previewName")!;
    const previewEmail = document.getElementById("previewEmail")!;
    const previewPhone = document.getElementById("previewPhone")!;
    const previewSummary = document.getElementById("previewSummary")!;
    const previewExperience = document.getElementById("previewExperience")!;
    const previewEducation = document.getElementById("previewEducation")!;

    const generateButton = document.getElementById("generateResume")!;
    const shareLinkInput = document.getElementById("shareableLink") as HTMLInputElement;
    const copyLinkButton = document.getElementById("copyLink")!;

    generateButton.addEventListener("click", () => {
        // Populate preview
        previewName.textContent = nameInput.value || "[Full Name]";
        previewEmail.textContent = emailInput.value || "[Email]";
        previewPhone.textContent = phoneInput.value || "[Phone]";
        previewSummary.textContent = summaryInput.value || "[Summary]";
        previewExperience.textContent = experienceInput.value || "[Experience]";
        previewEducation.textContent = educationInput.value || "[Education]";

        // Generate shareable link
        const resumeData = {
            name: nameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            summary: summaryInput.value,
            experience: experienceInput.value,
            education: educationInput.value,
        };

        const base64Data = btoa(JSON.stringify(resumeData));
        const shareableLink = `${window.location.origin}/?data=${encodeURIComponent(base64Data)}`;
        shareLinkInput.value = shareableLink;
    });

    copyLinkButton.addEventListener("click", () => {
        if (shareLinkInput.value) {
            navigator.clipboard.writeText(shareLinkInput.value);
            alert("Link copied to clipboard!");
        } else {
            alert("No link to copy. Generate a resume first.");
        }
    });

    // Fetch and display data if available
    const params = new URLSearchParams(window.location.search);
    const encodedData = params.get("data");
    if (encodedData) {
        const resumeData = JSON.parse(atob(encodedData));
        previewName.textContent = resumeData.name || "[Full Name]";
        previewEmail.textContent = resumeData.email || "[Email]";
        previewPhone.textContent = resumeData.phone || "[Phone]";
        previewSummary.textContent = resumeData.summary || "[Summary]";
        previewExperience.textContent = resumeData.experience || "[Experience]";
        previewEducation.textContent = resumeData.education || "[Education]";
    }
});
