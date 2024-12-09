document.addEventListener("DOMContentLoaded", function () {
    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var phoneInput = document.getElementById("phone");
    var summaryInput = document.getElementById("summary");
    var experienceInput = document.getElementById("experience");
    var educationInput = document.getElementById("education");
    var previewName = document.getElementById("previewName");
    var previewEmail = document.getElementById("previewEmail");
    var previewPhone = document.getElementById("previewPhone");
    var previewSummary = document.getElementById("previewSummary");
    var previewExperience = document.getElementById("previewExperience");
    var previewEducation = document.getElementById("previewEducation");
    var generateButton = document.getElementById("generateResume");
    var shareLinkInput = document.getElementById("shareableLink");
    var copyLinkButton = document.getElementById("copyLink");
    generateButton.addEventListener("click", function () {
        // Populate preview
        previewName.textContent = nameInput.value || "[Full Name]";
        previewEmail.textContent = emailInput.value || "[Email]";
        previewPhone.textContent = phoneInput.value || "[Phone]";
        previewSummary.textContent = summaryInput.value || "[Summary]";
        previewExperience.textContent = experienceInput.value || "[Experience]";
        previewEducation.textContent = educationInput.value || "[Education]";
        // Generate shareable link
        var resumeData = {
            name: nameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            summary: summaryInput.value,
            experience: experienceInput.value,
            education: educationInput.value,
        };
        var base64Data = btoa(JSON.stringify(resumeData));
        var shareableLink = "".concat(window.location.origin, "/?data=").concat(encodeURIComponent(base64Data));
        shareLinkInput.value = shareableLink;
    });
    copyLinkButton.addEventListener("click", function () {
        if (shareLinkInput.value) {
            navigator.clipboard.writeText(shareLinkInput.value);
            alert("Link copied to clipboard!");
        }
        else {
            alert("No link to copy. Generate a resume first.");
        }
    });
    // Fetch and display data if available
    var params = new URLSearchParams(window.location.search);
    var encodedData = params.get("data");
    if (encodedData) {
        var resumeData = JSON.parse(atob(encodedData));
        previewName.textContent = resumeData.name || "[Full Name]";
        previewEmail.textContent = resumeData.email || "[Email]";
        previewPhone.textContent = resumeData.phone || "[Phone]";
        previewSummary.textContent = resumeData.summary || "[Summary]";
        previewExperience.textContent = resumeData.experience || "[Experience]";
        previewEducation.textContent = resumeData.education || "[Education]";
    }
});
