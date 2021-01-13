export default class ED4EItemSheet extends ItemSheet {

    get template() {
        const path = 'systems/ed4e/templates/item/';
            return `${path}${this.item.data.type}sheet.hbs`;
    }

    getData () {
        const data = super.getData();

        data.config = CONFIG.ed4e; 
        
        return data;
    }
}

