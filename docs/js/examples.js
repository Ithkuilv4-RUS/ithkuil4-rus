class ExamplesLoader {
  constructor(jsonUrl) {
    this.jsonUrl = jsonUrl;
    this.data = null;
    this.imgPath = jsonUrl.split('.')[0]+"/";
  }

  async loadData() {
    try {
      const response = await fetch(this.jsonUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.data = await response.json();
      return this.data;
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      return null;
    }
  }

  getExample(id) {
    if (!this.data) {
      console.warn('Данные ещё не загружены. Сначала вызовите loadData().');
      return null;
    }
    const item = this.data.find(item => item.id === id);
    const result = item ?
        `<table border="0">`+
        `<tr>`+
            `<td class=example-romanized>`+item.romanized+`</td>`+
            `<td class=example-russian>`+item.russian+`</td>`+
        `</tr>`+
        `<tr>`+
            `<td colspan="2" class=example-glosses>`+item.glosses+`</>`+
        `</tr>`+
        `<tr>`+
        `<td colspan="2"><img height=50px src=`+this.imgPath+id+`.svg></td>`+
        `</tr>`+
        `<tr>`+
        `<td colspan="2"><img height=50px src=`+this.imgPath+id+`.h.svg></td>`+
        `</tr>`+
        `</table>`
        : null
    ;
    return result;
  }
}

export function processExamples() {
  // Находим все элементы с классом 'example'
  const exampleElements = document.querySelectorAll('.example');

  exampleElements.forEach((exampleElement) => {
    // Извлекаем текст из трёх дочерних элементов
    const romanizedElement = exampleElement.querySelector('.example-romanized');
    const russianElement = exampleElement.querySelector('.example-russian');
    const glossesElement = exampleElement.querySelector('.example-glosses');
    const calligraphicElement = exampleElement.querySelector('.example-calligraphic');

    const romanized = romanizedElement ? romanizedElement.textContent.trim() : '';
    const russian = russianElement ? russianElement.textContent.trim() : '';
    const glosses = glossesElement ? glossesElement.innerHTML : '';
    const calligraphic = calligraphicElement ? calligraphicElement.innerHTML : '';
    
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

      const svgContainer = document.createElement('div');
      svgContainer.innerHTML = calligraphic;

      // Устанавливаем высоту через стиль
      svgContainer.style.height = '50px';
      svgContainer.style.width = 'auto';
      svgContainer.style.display = 'inline-block';

      cell4.appendChild(svgContainer);

    }

    // Заменяем исходный элемент на таблицу
    exampleElement.replaceWith(table);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  processExamples();
});

export { ExamplesLoader };

