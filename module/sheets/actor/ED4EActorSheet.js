import { StepRoll } from "../../utility/steproll.js" ;
import { ActionRoll } from "../../utility/actionroll.js";

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
            width: 824,
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
            data.hideTraits = false;

            data.weapons = data.items.filter(function(item) {return item.type == "weapon"});
            data.skills = data.items.filter(function(item) {return item.type == "ability" && item.data.subtype == "skill"});
            data.talents = data.items.filter(function(item) {return item.type == "ability" && item.data.subtype == "talent"});
            data.equipment = data.items.filter(function(item) {return item.type == "equipment"});
            data.armor = data.items.filter(function(item) {return item.type == "armor"});
            data.spells = data.items.filter(function(item) { return item.type == "spell"});
            data.threaditems = data.items.filter(function(item) { return item.type == "thread_item"});
            data.npc_attacks = data.items.filter(function(item) { return item.type == "npc_attack"});
            data.pc_actions = data.items.filter(function(item) { return item.type == "pc_action"});
            data.matrices = data.items.filter(function(item) {return item.type == "matrix"});
            data.disciplines = data.items.filter(function(item) {return item.type == "discipline"});
            data.traits = data.items.filter(function(item) {return item.type=="trait"});
            data.journeys = this.buildJourneyData(data);

            if(!Array.isArray(data.traits) || !data.traits.length) {
                data.hideTraits = true;
            }
            

            let combCircle = 0;
            let discString = "";
            data.disciplines.forEach(function(d,index) {
                combCircle += d.data.circle;
                discString += d.name + " " + d.data.circle;
                if (index === data.disciplines.length-1) {
                    discString += "";
                } else {
                    discString += " / ";
                }
            });

            data.totalCircles = combCircle;
            data.discString = discString;
                

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
            html.find('.attr-roll').click(this._onAttributeRoll.bind(this));
            html.find('.select-race').change(this._onSelectRace.bind(this));
            html.find('.step-roll').click(this._onStepRoll.bind(this));
            html.find('.tick').click(this._onIncreaseOrDecreaseStat.bind(this));

            // disabling for testing; number of game-flow and immersion problems incurred
           /*  html.find('.action-roll').click(this._onActionRoll.bind(this)); */
        }

        _onInlineEdit(e){
            e.preventDefault();

            let element = e.currentTarget;
    
            let itemId = element.closest(".item").dataset.itemId;
    
            let item = this.actor.getOwnedItem(itemId);
    
            let field = element.dataset.field;
            
            return item.update({ [field]: element.value}); 
        }

        _onAddItem(e) {
            e.preventDefault();
                
            let element = e.currentTarget;
        
            let itemData  = {
                name: "New Item",
                type: element.dataset.type
            }

            return this.actor.createOwnedItem(itemData, {renderSheet:true});
        }

        _onEditItem(e) {
            e.preventDefault();

            let element = e.currentTarget;
    
            let itemId = element.closest(".item").dataset.itemId;
    
            let item = this.actor.getOwnedItem(itemId);
    
            item.sheet.render(true);
        }

        _onDeleteItem(e) {
            e.preventDefault();
            let element = e.currentTarget;
            let itemId = element.closest(".item").dataset.itemId;
    
            let d = new Dialog({
              title: "Delete This Item?",
              content: "<p>Are you sure you want to delete this item?</p>",
              buttons: {
               one: {
                icon: '<i class="fas fa-check"></i>',
                label: "Yes",
                callback: () => { this.actor.deleteOwnedItem(itemId) }
               },
               two: {
                icon: '<i class="fas fa-times"></i>',
                label: "Cancel",
                callback: () => { return; }
               }
              },
              default: "two",
              render: html => console.log("Register interactivity in the rendered dialog"),
              close: html => console.log("This always is logged no matter which option is chosen")
             });
             d.render(true);
        }

        _toggleEffectLine(e) {
            e.preventDefault();
        
            $(e.currentTarget).next('.effect-info').slideToggle("fast");
        }

        _equipItem(e) {
            e.preventDefault();
            let element = e.currentTarget;
            let itemId = element.closest(".item").dataset.itemId;
            let item = this.actor.getOwnedItem(itemId);
            
            let subType = item.data.data.type;

            let itemList = this.actor.items.filter((item) => {return item.data.data.type == subType});

            itemList.forEach((i) => {
                i.update({"data.equipped": false});
            });

            let val = element.checked;
            return item.update({"data.equipped":val});


        }

        _onRollItem(e) {
            e.preventDefault();
            let element=e.currentTarget;
            let itemId = element.dataset.itemId;
            return this.actor.itemRoll(itemId);
        }

        _onAttributeRoll(e) {
            e.preventDefault();
            let element = e.currentTarget;
            let attr = element.dataset.attrName;
            return this.actor.attributeRoll(attr);
        }

        _onSelectRace(e) {
            e.preventDefault();
            
        }

        _onStepRoll(e){
            e.preventDefault();
            let element=e.currentTarget;
            let step = element.dataset.step;
            let rtype = element.dataset.rollType;
            let wounds = element.dataset.wounds;
            console.warn("Wounds reported: ", wounds);
            StepRoll.prompt(step, rtype, wounds);
        }

        /**
         * DEPRECATED 
         * @param {} e 
         */
        /*
        _onActionRoll(e){
            e.preventDefault();
            let element = e.currentTarget;
            let id = element.dataset.itemId;
            ActionRoll.roll(this.actor, id);
        }
        */

        _onIncreaseOrDecreaseStat(e) {
            e.preventDefault();
            let element = e.currentTarget;
            let stat = element.dataset.statName;
            let delta = element.dataset.direction;

            return this.actor.increaseOrDecreaseStat(stat, delta);
        }

        buildJourneyData(data) {
            const abils = data.items.filter(function(item) { return item.type == "ability"});
            let baseStep = this.actor.data.data.attributes.perception.step;
            let baseDice = this.actor.data.data.attributes.perception.dice;

            let journeyData = {
                lead: {
                    step: baseStep,
                    dice: baseDice
                },
                watch: {
                    step: baseStep,
                    dice: baseDice
                },
                forage: {
                    step: baseStep,
                    dice: baseDice
                },
                hunt: {
                    step: baseStep,
                    dice: baseDice
                },
                fish: {
                    step: baseStep,
                    dice: baseDice
                },
                camp: {
                    step: baseStep,
                    dice: baseDice
                }
            }

            

            let wildSurv = abils.filter(function(item) { return item.name == "Wilderness Survival"})[0];
            let aware = abils.filter(function(item) { return item.name == "Awareness"})[0];
            let nav = abils.filter(function(item) { return item.name == "Navigation"})[0];

            console.warn("Wild Survival: ", wildSurv);

            if (wildSurv != undefined) {
                journeyData.forage.step = wildSurv.data.step;
                journeyData.forage.dice = wildSurv.data.dice;
                journeyData.hunt.step = wildSurv.data.step;
                journeyData.hunt.dice = wildSurv.data.dice;
                journeyData.fish.step = wildSurv.data.step;
                journeyData.fish.dice = wildSurv.data.dice;
                journeyData.camp.step = wildSurv.data.step;
                journeyData.camp.dice = wildSurv.data.dice;
            }

            if (aware != undefined) {
                journeyData.watch.step = aware.data.step;
                journeyData.watch.dice = aware.data.dice;
            }

            if (nav != undefined) {
                journeyData.lead.step = nav.data.step;
                journeyData.lead.dice = nav.data.dice;
            }

            
            return journeyData;

        }

}