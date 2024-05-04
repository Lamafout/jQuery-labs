// Change value of height indicator
let currentHeight = document.querySelector('.heightValue');
$('input[type="range"]').on('input', function () { 
    currentHeight.textContent = $(this).val(); // Используйте textContent
});

// Save value of sex
let sex;
$('input[name="sex"]').click(function () {
    sex = $(this).val(); // Используйте.val() для получения значения из input
});

// Ajax send with Post
$('button').click(function () {
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/backend/a3.go',
        data: JSON.stringify({ // Преобразуйте объект в строку JSON
            height: currentHeight.textContent, // Используйте textContent
            sex: sex
        }),
        contentType: 'application/json', // Укажите тип контента как JSON
        success: function (data) {
            let res = JSON.parse(data);
            alert("Идеальный вес: " + res.weight + " кг");
        }
    });
});
