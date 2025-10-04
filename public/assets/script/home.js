document.addEventListener("DOMContentLoaded", function () {
    const updateLinks = document.querySelectorAll('.update-link');
    const updateFormContainer = document.querySelector('.container-home__update-employee');
    const updateForm = updateFormContainer.querySelector('form');
    const updateFormContainerBefore = document.querySelector('.container-home .update-employee__background');

    updateLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const li = link.closest('li');
            const spans = li.querySelectorAll('span');
            const [firstName, lastName, mail, age, gender] = Array.from(spans).map(s => s.textContent.trim());
            const id = link.href.split('/').pop();

            updateForm.querySelector('[name="firstName"]').value = firstName;
            updateForm.querySelector('[name="lastName"]').value = lastName;
            updateForm.querySelector('[name="mail"]').value = mail;
            updateForm.querySelector('[name="age"]').value = age;
            updateForm.querySelector('[name="gender"]').value = gender;
            updateForm.querySelector('[name="id"]').value = id;
            updateForm.action = '/updateEmployee/' + link.dataset.id;

            updateFormContainer.style.opacity = "1";
            updateFormContainer.style.visibility = "visible";
            updateForm.scrollIntoView({ behavior: "smooth" });
        });
    });

    updateFormContainerBefore.addEventListener('click', function () {
        updateFormContainer.style.opacity = "0";
        updateFormContainer.style.visibility = "hidden";
    });

    window.addEventListener('click', function (e) {
        if (e.target === updateFormContainer) {
            updateFormContainer.style.opacity = "0";
            updateFormContainer.style.visibility = "hidden";
        }
    });
});