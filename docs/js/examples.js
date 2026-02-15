class ExamplesLoader {
  constructor(jsonUrl) {
    this.jsonUrl = jsonUrl;
    this.data = null;
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
        `<p class=example-romanized>`+item.romanized+`</>`
        : null
    ;
    return result;
  }
}

export { ExamplesLoader };
