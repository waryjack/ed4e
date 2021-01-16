import { StepUtil } from "../utility/steps.js";

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

        data.carry = (atts.strength.step * 5) + 10;
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

}
