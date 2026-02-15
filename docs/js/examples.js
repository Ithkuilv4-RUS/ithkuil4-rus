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

export { ExamplesLoader };
