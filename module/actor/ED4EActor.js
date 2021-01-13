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
        const atts = data.data.attributes;

        for (let att in atts) {
            let newStep = 0;
            let rating = att.value;
            newStep = Math.ceiling(rating/3) + 1;

            atts[att].step = newStep;
        }

        console.log("revised atts", atts);
    
        setProperty(this, "data.data.attributes", atts);

    }

    _prepareDefenses(data) {
        let atts = data.data.attributes;
        let defs = data.data.defenses;
        let socDef = 0;
        let physDef = 0;
        let mystDef = 0;
        
        physDef = Math.ceil(atts.dexterity.value/2) + 1;
        mystDef = Math.ceil(atts.perception.value/2) + 1;
        socDef = Math.ceil(atts.charisma.value/2) + 1;

        defs.physical.value = physDef;
        defs.mystic.value = mystDef;
        defs.social.value = socDef;

        setProperty(this, "data.data.defenses", defs);

    }

    _prepareArmor(data) {
        let atts = data.data.attributes;
        let armor = data.data.armor;

        let mysticArmor = Math.ceil(atts.willpower.value/5);

        armor.mystic = mysticArmor;

        setProperty(this, "data.data.armor", armor);

        
    }

    _prepareHealth(data) {
        let atts = data.data.attributes;
        let health = data.data.health;

        let unconTh = atts.toughness.value * 2;
        let deathTh = unconTh + atts.toughness.step;
        let woundTh = Math.ceil(atts.toughness.value/2) + 2;
        let recovTotal = Math.ceil(atts.toughness.value/6);
        
        health.thresholds.uncon = unconTh;
        health.thresholds.death = deathTh;
        health.thresholds.wound = woundTh;
        health.recovery.max = recovTotal - health.recovery.used;
        health.recovery.step = atts.toughness.step;
        health.damage.max = deathTh;

        setProperty(this, "data.data.health", health);
    }

}
