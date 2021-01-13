export default class ED4EActorSheet extends ActorSheet {

        get template() {
            const path = 'systems/ed4e/templates/actor/';
            return `${path}${this.actor.data.type}sheet.hbs`;
        }
    
        /**
         * @override
         */
        static get defaultOptions() {
            return mergeObject(super.defaultOptions, {
            classes: ['ed4e', 'sheet', 'actor', 'actor-sheet'],
            width: 775,
            height: 685,
            left:120,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheetbody", initial: "main"}],
            dragDrop: [{dragSelector: ".dragline", dropSelector: null}]
            });
        }
        
        /**
         * @override
         */
        getData () {
            const data = super.getData();
    
            data.config = CONFIG.ed4e; 
           
            return data;
        }


}