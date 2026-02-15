
export function processExamples() {
  // Находим все элементы с классом 'example'
  const exampleElements = document.querySelectorAll('.example');

  exampleElements.forEach((exampleElement) => {
    // Извлекаем текст из трёх дочерних элементов
    const romanizedElement = exampleElement.querySelector('.example-romanized');
    const russianElement = exampleElement.querySelector('.example-russian');
    const glossesElement = exampleElement.querySelector('.example-glosses');
    const calligraphicElement = exampleElement.querySelector('.example-calligraphic');
    const handwrittenElement = exampleElement.querySelector('.example-handwritten');

    const romanized = romanizedElement ? romanizedElement.textContent.trim() : '';
    const russian = russianElement ? russianElement.textContent.trim() : '';
    const glosses = glossesElement ? glossesElement.innerHTML : '';
    const calligraphic = calligraphicElement ? calligraphicElement.innerHTML : '';
    const handwritten = handwrittenElement ? handwrittenElement.innerHTML : '';
    
    // Создаём таблицу
    const table = document.createElement('table');

    const row1 = table.insertRow();

    const cell1 = row1.insertCell(0);
    cell1.className = 'example-romanized'; // Класс для первой ячейки
    cell1.textContent = romanized;

    const cell2 = row1.insertCell(1);
    cell2.className = 'example-russian'; // Класс для второй ячейки
    cell2.textContent = russian;

    // Вторая строка — одна объединённая ячейка с отдельным классом
    const row2 = table.insertRow();
    const cell3 = row2.insertCell(0);
    cell3.className = 'example-glosses'; // Класс для объединённой ячейки
    cell3.colSpan = 2; // Объединяем две ячейки
    cell3.innerHTML = glosses;

    if (calligraphic) {
      const row3 = table.insertRow();
      const cell4= row3.insertCell(0);
      cell4.colSpan = 2; // Объединяем две ячейки

      const svgDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(calligraphic)}`;

      // Создаём элемент <img>
      const img = document.createElement('img');
      img.src = svgDataUrl;
      img.alt = 'каллиграфическое письмо';
      img.style.height = '50px';
      img.style.width = 'auto'; // Сохраняем пропорции
      img.style.display = 'block'; // Убираем лишние отступы
      img.style.margin = '0 auto'; // Центрируем изображение

      cell4.appendChild(img);

    }
    if (handwritten) {
      const row4 = table.insertRow();
      const cell5= row4.insertCell(0);
      cell5.colSpan = 2; // Объединяем две ячейки

      const svgDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(handwritten)}`;

      // Создаём элемент <img>
      const img = document.createElement('img');
      img.src = svgDataUrl;
      img.alt = 'рукописное письмо';
      img.style.height = '50px';
      img.style.width = 'auto'; // Сохраняем пропорции
      img.style.display = 'block'; // Убираем лишние отступы
      img.style.margin = '0 auto'; // Центрируем изображение

      cell5.appendChild(img);

    }

    // Заменяем исходный элемент на таблицу
    exampleElement.replaceWith(table);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  processExamples();
});


