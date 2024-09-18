function bruteForcePassword(realPassword, maxLength = 10) {
    const startTime = Date.now(); // Фіксуємо початок часу
    for (let length = 1; length <= maxLength; length++) {
        const result = tryPassword(realPassword, length, "", startTime); // Передаємо startTime
        if (result) {
            return result;
        }
    }
    return { foundPassword: null, timeTaken: null };
}

function tryPassword(realPassword, length, currentPassword, startTime) {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]:;'<>,.?/";

    if (currentPassword.length === length) {
        if (currentPassword === realPassword) {
            const endTime = Date.now();  // Фіксуємо час завершення
            return { foundPassword: currentPassword, timeTaken: (endTime - startTime) / 1000 };
        }
        return null;
    }

    for (let char of characters) {
        const result = tryPassword(realPassword, length, currentPassword + char, startTime); // Передаємо startTime у рекурсії
        if (result) {
            return result;
        }
    }

    return null;
}

document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault();

    let realPassword = document.getElementById("pass").value;
    const loader = document.getElementById("loader");
    const submitButton = document.querySelector('input[type="submit"]');
    const passwordInput = document.getElementById("pass");

    if (realPassword !== "") {
        // Показуємо завантажувальний екран
        loader.style.display = "flex";
        submitButton.disabled = true;  // Вимикаємо кнопку
        passwordInput.disabled = true; // Вимикаємо інпут

        setTimeout(() => {
            let { foundPassword, timeTaken } = bruteForcePassword(realPassword, realPassword.length);

            if (foundPassword) {
                document.getElementById("msg").innerHTML = `Пароль зламано: ${foundPassword}<br>`;
                document.getElementById("msg").innerHTML += `Час витрачено: ${timeTaken.toFixed(2)} секунд`;
            } else {
                document.getElementById("msg").innerHTML = 'Пароль не знайдено.';
            }

            // Ховаємо завантажувальний екран після завершення
            loader.style.display = "none";
            submitButton.disabled = false;  // Активуємо кнопку
            passwordInput.disabled = false; // Активуємо інпут
        }, 100);  // Додаємо невеликий таймаут для запуску завантаження
    }
});