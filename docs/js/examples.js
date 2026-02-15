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
    const data1Element = exampleElement.querySelector('.example-data1');
    const data2Element = exampleElement.querySelector('.example-data2');
    const data3Element = exampleElement.querySelector('.example-data3');

    const data1 = data1Element ? data1Element.textContent.trim() : 'Нет данных 1';
    const data2 = data2Element ? data2Element.textContent.trim() : 'Нет данных 2';
    const data3 = data3Element ? data3Element.textContent.trim() : 'Нет данных 3';

    // Создаём таблицу
    const table = document.createElement('table');
    table.className = 'example-table'; // Общий класс для таблицы

    // Первая строка — два столбца с разными классами
    const row1 = table.insertRow();

    const cell1 = row1.insertCell(0);
    cell1.className = 'example-romanized'; // Класс для первой ячейки
    cell1.textContent = data1;

    const cell2 = row1.insertCell(1);
    cell2.className = 'example-russian'; // Класс для второй ячейки
    cell2.textContent = data2;

    // Вторая строка — одна объединённая ячейка с отдельным классом
    const row2 = table.insertRow();
    const cell3 = row2.insertCell(0);
    cell3.className = 'example-glosses'; // Класс для объединённой ячейки
    cell3.colSpan = 2; // Объединяем две ячейки
    cell3.textContent = data3;

    // Заменяем исходный элемент на таблицу
    exampleElement.replaceWith(table);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  processExamples();
});

export { ExamplesLoader };

// Экспортируем функцию для использования в других модулях
export { processExamples };
