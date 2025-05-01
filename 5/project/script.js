const numberInput = document.getElementById('numberInput');
const categorySelect = document.getElementById('category');
const resultDiv = document.getElementById('result');
const loadingDiv = document.getElementById('loading');

async function getFact() {
  const number = numberInput.value.trim();
  const category = categorySelect.value;

  if (!number) {
    resultDiv.textContent = 'Пожалуйста, введите число.';
    return;
  }

  resultDiv.textContent = '';
  loadingDiv.style.display = 'block';

  try {
    const response = await fetch(`http://numbersapi.com/${number}/${category}?json`);
    const data = await response.json();

    loadingDiv.style.display = 'none';

    if (data.found) {
      resultDiv.textContent = data.text;
    } else {
      resultDiv.textContent = `${number} - скучное число/скучный год.`;
    }
  } catch (error) {
    loadingDiv.style.display = 'none';
    resultDiv.textContent = 'Произошла ошибка при получении данных.';
  }
}

// Поиск по клавише Enter
numberInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    getFact();
  }
});
