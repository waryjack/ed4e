import { StepUtil } from "../utility/steps.js";
import { Messenger } from "../utility/messenger.js";

export class ED4EActor extends Actor {

  
  /**
   * @override
   */
  
  prepareBaseData(){
        super.prepareBaseData();
   
        const actorData = this.data; // actorData is "actor.data.data"

       // console.warn("prepareBaseData object: ", actorData);
        const data = actorData.data;
        const flags = actorData.flags;

        this._prepareCharacterData(actorData);
        
    }

    /**
    * @param actorData {ED4Eactor} - this ED4EActor object's system-specific data
    */
    _prepareCharacterData(actorData) {
        super.prepareDerivedData();
        const data = actorData.data;

        this._prepareAttributes(data);
        this._prepareDefenses(data);
        this._prepareArmor(data);
        this._prepareHealth(data);
        this._prepareInit(data);
        this._prepareItems(actorData);
        
        
    }

    /*
    Step Values: Attribute/3 (round up) + 1 [This was not changed]
    Defense Values: Attribute/2 (round up) +1
    Unconsciousness Rating: Toughness * 2
    Death Rating: Unconsciousness Rating + Toughness Step
    Wound Threshold: Toughness/2 (round up) + 2
    Recovery Tests: Toughness/6 (round up)
    Mystic Armor: Willpower/5 (round down)
    */

    _prepareAttributes(data) {
        console.warn("data: ", data);   
        const atts = data.attributes;

        console.warn("Atts: ", atts);
        for (let att in atts) {
            let newStep = 0;
            let rating = atts[att].value;
            newStep = Math.ceil(rating/3) + 1;
            console.warn("att, value, new step: ", att, rating, newStep);
            atts[att].step = newStep;
            atts[att].dice = StepUtil.getDiceText(newStep);
            atts[att].expr = StepUtil.getDiceExpr(newStep);       
        }

        data.carry = (atts.strength.value * 10) - 5;
        if (data.load > data.carry) {
           // use active effect here...in the future
        }

        console.log("revised atts", atts);
    
        setProperty(this, "data.data.attributes", atts);

    }

    _prepareDefenses(data) {
        let atts = data.attributes;
        let defs = data.defenses;
        let socDef = 0;
        let physDef = 0;
        let mystDef = 0;
        
        physDef = Math.ceil(atts.dexterity.value/2) + 1;
        mystDef = Math.ceil(atts.perception.value/2) + 1;
        socDef = Math.ceil(atts.charisma.value/2) + 1;

        defs.physical.base = physDef;
        defs.mystic.base = mystDef;
        defs.social.base = socDef;

        defs.physical.value = defs.physical.mod + defs.physical.base;
        defs.social.value = defs.social.mod + defs.physical.base;
        defs.mystic.value = defs.mystic.mod + defs.mystic.base;

        setProperty(this, "data.data.defenses", defs);

    }

    _prepareArmor(data) {
        let atts = data.attributes;
        let armor = data.armor;

        let mysticArmor = Math.ceil(atts.willpower.value/5);

        armor.mystic.base = mysticArmor;
        armor.mystic.value = armor.mystic.base + armor.mystic.mod;

        setProperty(this, "data.data.armor", armor);

        
    }

    _prepareHealth(data) {
        let atts = data.attributes;
        let health = data.health;

        let unconTh = atts.toughness.value * 2;
        let deathTh = unconTh + atts.toughness.step;
        let woundTh = Math.ceil(atts.toughness.value/2) + 2;
        let recovTotal = Math.ceil(atts.toughness.value/6);
        
        health.thresholds.uncon = unconTh;
        health.thresholds.death = deathTh;
        health.thresholds.wound = woundTh;
        health.recovery.max = recovTotal;
        health.recovery.avail = health.recovery.max - health.recovery.used;
        health.recovery.step = atts.toughness.step;
        health.damage.max = deathTh;

        setProperty(this, "data.data.health", health);
    }

    _prepareInit(data) {
        let init = data.initiative;
        let initStep = data.attributes.dexterity.step + init.armor_mod;
        init.step = initStep;
        init.dice = StepUtil.getDiceText(initStep);
        init.expr = StepUtil.getDiceExpr(initStep);

        setProperty(this, "data.data.initiative", init);
    }

    // Iterate through items and calculate full step for items what need it
    _prepareItems(data) {
        const items = data.items;
       //  console.warn("items before: ", items);
        let totalWeight = 0;
        items.forEach((item) => {
            
            console.warn("item: ", item);
            let itemWeight = item.data.common.weight;
            totalWeight += itemWeight;
            
            if(item.type == "ability") {
                let comstep = item.data.rank + data.data.attributes[item.data.attribute].step;
                item.data.step = comstep;
                item.data.dice = StepUtil.getDiceText(comstep);
                item.data.expr = StepUtil.getDiceExpr(comstep);
            } else if (item.type == "weapon") {
                let comstep = item.data.base_dmg + data.data.attributes[item.data.attribute].step;
                item.data.full_dmg.step = comstep;
                item.data.full_dmg.dice = StepUtil.getDiceText(comstep);
                item.data.full_dmg.expr = StepUtil.getDiceExpr(comstep);
            }
        });

        console.warn("Total Weight: ", totalWeight);
        setProperty(this, "data.data.load", totalWeight);

        // console.warn("items after: ", items);
        // setProperty(this, "data.items", items);
    }

    attributeRoll(attr) {
        const actorData = duplicate(this.data);
        let template = "systems/ed4e/templates/roll/rolldialog.hbs";
        let diceText = StepUtil.getDiceText(actorData.data.attributes[attr].step);
        let diceExpr = StepUtil.getDiceExpr(actorData.data.attributes[attr].step);
        let showKarma = true;
        let dialogTitle = "Attribute Roll";


        let dialogData = {
            isItem: false,
            dlgTitle: dialogTitle,
            name: attr,
            step: actorData.data.attributes[attr].step,
            dice: diceText,
            expr: diceExpr,
            actorData: actorData,
            karma: showKarma
        }
      
        this.processRoll(template, dialogData);
    }

    itemRoll(id){
        const actorData = duplicate(this.data);
        let item = this.getOwnedItem(id);
        let template = "systems/ed4e/templates/roll/rolldialog.hbs";
        let diceText = "";
        let diceExpr = "";
        let diceStep = 0;
        let dialogTitle = "";
        let showKarma = false;

        console.warn(item);
        // Get item dice info
        if(item.type == "weapon") {
            diceText = item.data.data.full_dmg.dice;
            diceExpr = item.data.data.full_dmg.expr;
            diceStep = item.data.data.full_dmg.step;
            dialogTitle = "Damage Roll";

        } else {
            diceText = item.data.data.dice;
            diceExpr = item.data.data.expr;
            diceStep = item.data.data.step;
            dialogTitle = item.data.data.subtype + " Roll";
            showKarma = true;
        }

        console.warn("dice info: ", diceText, diceExpr, diceStep);

        let dialogData = {
            isItem: true,
            dlgTitle: dialogTitle,
            name: item.name,
            step: diceStep,
            dice: diceText,
            expr: diceExpr,
            actorData: actorData,
            karma: showKarma
        }

        this.processRoll(template, dialogData);
    }

    processRoll(template, dialogData) {

        renderTemplate(template, dialogData).then((dlg) => {
            new Dialog({
                title:dialogData.dlgTitle,
                content:dlg,
                buttons:{
                    roll: {
                        icon: "<i class='fa fa-check'></i>",
                        label: "Roll",
                        callback: (html) => {
                            let karmaDie = "";
                            let karmaDieText = "";
                            let useKarma = false;
                            let miscMod = "+" + html.find("#rollmod").val();
                            dialogData.isItem ? useKarma = false : useKarma = html.find("#useKarma")[0].checked;
                            console.warn("useKarma: ", useKarma);
                            if(useKarma) {
                                karmaDie = "+1d6x6";
                                karmaDieText = "+1d6";
                            }
                            let finalExpr = dialogData.expr + karmaDie + miscMod;
                            let finalDiceText = dialogData.dice + karmaDieText + miscMod;
                            let msgTemplate = "systems/ed4e/templates/chat/rollmessage.hbs";
                            let roll = new Roll(finalExpr).evaluate();
                            let result = roll.total;

                            console.warn("dialogdata", dialogData);

                            let msgData = {
                                roll:roll,
                                result:result,
                                name: dialogData.name,
                                mods: miscMod,
                                karmadie: karmaDie,
                                dice: finalDiceText,
                                step: dialogData.step
                            }

                            roll.getTooltip().then(tt => Messenger.createChatMessage(tt, msgData, msgTemplate));

                        }
                    },
                    close: {
                        icon: "<i class='fa fa-times'></i>",
                        label: "Cancel",
                        callback: () => { return; }
                    }
                },
                default:"close",

            },{width:300}).render(true);
        });

    }
}