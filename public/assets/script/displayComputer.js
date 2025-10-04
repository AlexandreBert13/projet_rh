document.addEventListener("DOMContentLoaded", function () {
    const updateLinks = document.querySelectorAll('.update-link');
    const updateFormContainer = document.querySelector('.container-home__update-computer');
    const updateForm = updateFormContainer.querySelector('form');
    const updateFormContainerBefore = document.querySelector('.container-computer .update-computer__background');

    const addButton = document.querySelector('.container-computer__add-button');
    const addFormContainerBefore = document.querySelector('.add-computer__background');
    const addFormContainer = document.querySelector('.container-home__add-computer');


    updateLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const li = link.closest('li');
            const spans = li.querySelectorAll('span');
            const macAddress = spans[0].textContent.trim();
            const id = link.dataset.id;

            updateForm.querySelector('[name="macAddress"]').value = macAddress;
            updateForm.querySelector('[name="id"]').value = id;
            updateForm.action = '/updateComputer/' + id;

            updateFormContainer.style.opacity = "1";
            updateFormContainer.style.visibility = "visible";
            updateForm.scrollIntoView({ behavior: "smooth" });
        });
    });

    addButton.addEventListener('click', function (e) {
        e.preventDefault();
        addFormContainer.style.opacity = "1";
        addFormContainer.style.visibility = "visible";
        addFormContainer.scrollIntoView({ behavior: "smooth" });
    });

    updateFormContainerBefore.addEventListener('click', function () {
        updateFormContainer.style.opacity = "0";
        updateFormContainer.style.visibility = "hidden";
    });

    addFormContainerBefore.addEventListener('click', function () {
        addFormContainer.style.opacity = "0";
        addFormContainer.style.visibility = "hidden";
    });

    window.addEventListener('click', function (e) {
        if (e.target === updateFormContainer) {
            updateFormContainer.style.opacity = "0";
            updateFormContainer.style.visibility = "hidden";
        }

        if (e.target === addFormContainer) {
            addFormContainer.style.opacity = "0";
            addFormContainer.style.visibility = "hidden";
        }
    });});