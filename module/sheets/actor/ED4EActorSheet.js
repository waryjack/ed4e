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
           
      

            data.weapons = data.items.filter(function(item) {return item.type == "weapon"});
            data.skills = data.items.filter(function(item) {return item.type == "ability" && item.data.subtype == "skill"});
            data.talents = data.items.filter(function(item) {return item.type == "ability" && item.data.subtype == "talent"});
            
            console.warn(data.talents);
            return data;

        }

        activateListeners(html){
            super.activateListeners(html);

            // DragDrop Handler
            let handler = (ev) => this._onDragStart(ev);
            html.find('.item-name').each((i, item) => {
                if (item.dataset && item.dataset.itemId) {
                    item.setAttribute('draggable', true);
                    item.addEventListener('dragstart', handler, false);
                }
            });

            // Sheet Action Listeners
            html.find('.inline-edit').change(this._onInlineEdit.bind(this));
            html.find('.add-item').click(this._onAddItem.bind(this));
            html.find('.item-edit').click(this._onEditItem.bind(this));
            html.find('.item-delete').click(this._onDeleteItem.bind(this));
            html.find('.effect-toggle').click(this._toggleEffectLine.bind(this));
            html.find('.equip-item').change(this._equipItem.bind(this));
            html.find('.item-roll').click(this._onRollItem.bind(this));
            html.find('.spec-roll').click(this._onRollSpecial.bind(this));
        }

        _onInlineEdit(e){

        }

        _onAddItem(e) {

        }

        _onEditItem(e) {

        }

        _onDeleteItem(e) {

        }

        _toggleEffectLine(e) {

        }

        _equipItem(e) {

        }

        _onRollItem(e) {

        }

        _onRollSpecial(e) {

        }
}