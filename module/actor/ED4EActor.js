import { StepUtil } from "../utility/steps.js";
import { Messenger } from "../utility/messenger.js";

export class ED4EActor extends Actor {

  
  /**
   * @override
   */
  
  prepareBaseData(){
        super.prepareBaseData();
   
        const actorData = this.data; // actorData is "actor.data.data"

        const data = actorData.data;
        const flags = actorData.flags;
      
        if(actorData.type == "character") {
            this._prepareCharacterData(actorData);
        }

        if(actorData.type == "npc") {
            this._prepareNpcData(actorData);
        }
        
    }

    /**
     * @override 
     * @param {ED4EActor} actorData
     */
    _prepareNpcData(actorData){
        super.prepareDerivedData();
        const data = actorData.data;

        this._prepareNpcAttributes(data);
        this._prepareNpcDefenses(data);
        this._prepareNpcAttacks(actorData);
        this._prepareNpcInit(data);


    }

    /**
     * 
     * @param {Object} data 
     */

    _prepareNpcAttributes(data) {

        const atts = data.attributes;

        // console.warn("Atts: ", atts);
        for (let att in atts) {
            let newStep = atts[att].step;
            atts[att].dice = StepUtil.getDiceText(newStep);
            atts[att].expr = StepUtil.getDiceExpr(newStep);       
        }

       // console.log("revised atts", atts);
    
        setProperty(this, "data.data.attributes", atts);

    }

    _prepareNpcDefenses(data) {
        
        setProperty(this, "data.data.physical_defense", data.physical_defense + data.miscmods.misc_pd_mod);
        setProperty(this, "data.data.mystic_defense", data.mystic_defense + data.miscmods.misc_md_mod);
        setProperty(this, "data.data.social_defense", data.social_defense + data.miscmods.misc_sd_mod);
        setProperty(this, "data.data.physical_armor", data.physical_armor + data.miscmods.misc_pa_mod);
        setProperty(this, "data.data.mystic_armor", data.mystic_armor + data.miscmods.misc_ma_mod);
    }

    _prepareNpcAttacks(data) {
        const items = data.items;
        
         if (!Array.isArray(items) || !items.length) { return; }
 
         
         items.forEach((item) => {
        
            if(item.type == "npc_attack"){
                 item.data.dice = StepUtil.getDiceText(item.data.step);
                 item.data.expr = StepUtil.getDiceExpr(item.data.step);
                 item.data.dmg_dice = StepUtil.getDiceText(item.data.dmg_step);
                 item.data.dmg_expr = StepUtil.getDiceExpr(item.data.dmg_step);    
            }

            if(item.type == "weapon") {
                let comstep = (item.data.attribute == "") ? item.data.base_dmg : item.data.base_dmg + data.data.attributes[item.data.attribute].step;
                item.data.full_dmg.step = comstep;
                item.data.full_dmg.dice = StepUtil.getDiceText(comstep);
                item.data.full_dmg.expr = StepUtil.getDiceExpr(comstep);
            }
         });
 
        
    }

    _prepareNpcInit(data) {
        let init = data.initiative;
    

        let initStep = Math.max(1, init.base + data.miscmods.misc_init_step - data.health.damage.wounds);
        init.step = initStep;
        init.dice = StepUtil.getDiceText(initStep);
        init.expr = StepUtil.getDiceExpr(initStep);

        setProperty(this, "data.data.initiative", init);
    }

    /**
    * @param {ED4EActor} actorData - this ED4EActor object's system-specific data
    */
    _prepareCharacterData(actorData) {
        super.prepareDerivedData();
        const data = actorData.data;

        this._prepareAttributes(data);
        this._prepareNamegiverRace(data);
        this._prepareDisciplines(actorData);
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
        const carry = [0,10,15,20,25,30,40,50,60,70,80,95,110,125,140,155,175,195,215,235,255,280,305,330,355,380,410,440,370,500,530];
        // console.warn("Atts: ", atts);
        for (let att in atts) {
            let newStep = 0;
            let rating = atts[att].value;
            newStep = Math.ceil(rating/3) + 1;
            atts[att].step = newStep;
            atts[att].dice = StepUtil.getDiceText(newStep);
            atts[att].expr = StepUtil.getDiceExpr(newStep);       
        }

        data.carry = carry[atts.strength.value] + data.miscmods.misc_carry;
        if (data.load > data.carry) {
           // use active effect here...in the future
        }

       // console.log("revised atts", atts);
    
        setProperty(this, "data.data.attributes", atts);

    }

    _prepareNamegiverRace(data) {
        const racialMods = {
            dwarf: {
                move:10,
                km:4,
                traits:"Heat sight, strong back"
            },
            elf: {
                move:14,
                km:4,
                traits:"Low-light vision"
            },
            human: {
                move:12,
                km:5,
                traits:"Versatility"
            },
            obsidiman: {
                move:10,
                km:3,
                traits:"Increased Wound Threshold (+3), Natural Armor (+3)"
            },
            ork: {
                move:12,
                km:5,
                traits:"Gahad, Low-light vision"
            },
            troll: {
                move:14,
                km:3,
                traits:"Heat sight"
            },
            tskrang: {
                move:12,
                km:4,
                traits:"Tail combat"
            },
            windling:{
                move:6,
                km:6,
                traits:"Astral sight, Flight, Increased Physical Defense (+2), +10 movement when flying"
            }
        }

        setProperty(this, "data.data.movement", racialMods[data.race].move + data.miscmods.misc_move);
        setProperty(this, "data.data.karma.mod", racialMods[data.race].km);
        setProperty(this, "data.data.r_traits", racialMods[data.race].traits);

        if(data.race == "windling") {
            setProperty(this, "data.data.r_def_bonus", 2);
        }

        if(data.race == "obsidiman") {
            setProperty(this, "data.data.r_wound_bonus", 3);
            setProperty(this, "data.data.r_armor_bonus", 3);
        }

    }


    _prepareDefenses(data) {
        let atts = data.attributes;
        let defs = data.defenses;
        
        let socDef = 0;
        let physDef = 0;
        let mystDef = 0;
        let physDefBonus = 0;
        let mystDefBonus = 0;
        
        physDef = Math.ceil(atts.dexterity.value/2) + 1;
        mystDef = Math.ceil(atts.perception.value/2) + 1;
        socDef = Math.ceil(atts.charisma.value/2) + 1;

        defs.physical.base = physDef;
        defs.mystic.base = mystDef;
        defs.social.base = socDef;

        //Armor calcs
        let activeArmor = this.data.items.filter(function(item) {return item.type == "armor" && item.data.equipped});

        activeArmor.forEach((i) => {
            physDefBonus += i.data.physical_defense;
            mystDefBonus += i.data.mystic_defense;
        });

        // Discipline Calcs

       

        defs.physical.value = defs.physical.mod + defs.physical.base + physDefBonus + data.r_def_bonus + data.miscmods.misc_pd_mod + data.discipline_mods.pd;
        defs.social.value = defs.social.mod + defs.social.base + data.miscmods.misc_sd_mod + data.discipline_mods.sd;
        defs.mystic.value = defs.mystic.mod + defs.mystic.base + mystDefBonus + data.miscmods.misc_md_mod + data.discipline_mods.md;

        setProperty(this, "data.data.defenses", defs);

    }

    _prepareArmor(data) {
        let atts = data.attributes;
        let armor = data.armor;
        let paBonus = 0;
        let maBonus = 0;

        let mysticArmor = Math.floor(atts.willpower.value/5);

        //Armor calcs
        let activeArmor = this.data.items.filter(function(item) {return item.type == "armor" && item.data.equipped});

        activeArmor.forEach((i) => {
            paBonus += i.data.physical_armor;
            maBonus += i.data.mystic_armor;
        });

        armor.physical.value = paBonus + data.r_armor_bonus + data.miscmods.misc_pa_mod + data.discipline_mods.pa;
        armor.mystic.base = mysticArmor;
        armor.mystic.value = armor.mystic.base + armor.mystic.mod + maBonus + data.miscmods.misc_ma_mod + data.discipline_mods.ma;

        setProperty(this, "data.data.armor", armor);

        
    }

    _prepareHealth(data) {
        const durability = {
            none: 0,
            air_sailor: 5,
            archer: 5,
            beastmaster: 7,
            cavalryman: 7,
            elementalist: 3,
            gauntlet:7,
            nethermancer: 3,
            illusionist: 3,
            scout: 5,
            shaman:3,
            sky_raider: 7,
            swordmaster: 7,
            thief: 5,
            troubadour: 5,
            warrior: 7,
            weaponsmith: 5,
            wizard: 3
        }

        let atts = data.attributes;
        let health = data.health;
        let disciplines = this.data.items.filter(i => { return i.type == "discipline"});

        // let durabilityBonus = durability[data.discipline];
        let durabilityBonus = this._getDisciplineDurability(disciplines);

        
        let durPerLevel = durabilityBonus * this._getCombinedCircle(disciplines);
        
        console.warn("Combined Circles: ", this._getCombinedCircle(disciplines));
        console.warn("Durability Bonus: ", durabilityBonus);
        console.warn("Dur * Level: ", durPerLevel);

        let unconTh = (atts.toughness.value * 2);
        let deathTh = unconTh + atts.toughness.step;
        let woundTh = Math.ceil(atts.toughness.value/2) + 2;
        let recovTotal = Math.ceil(atts.toughness.value/6);
        
        health.thresholds.uncon = unconTh + data.miscmods.misc_uncon + durPerLevel;
        health.thresholds.death = deathTh + data.miscmods.misc_death + this._getCombinedCircle(disciplines) + durPerLevel;
        health.thresholds.wound = woundTh + data.r_wound_bonus + data.miscmods.misc_wound;

        // Recovery Tests
        

        health.recovery.max = recovTotal + data.discipline_mods.rc_tests;
        health.recovery.step = atts.toughness.step + data.discipline_mods.rc_step;
        health.damage.max = deathTh;

        setProperty(this, "data.data.health", health);
    }

    _prepareInit(data) {
        let init = data.initiative;
        let armorMod = 0;

        //Armor calcs
        let activeArmor = this.data.items.filter(function(item) {return item.type == "armor" && item.data.equipped});

        activeArmor.forEach((i) => {
            armorMod -= i.data.init_mod;
        });

        init.armor_mod = armorMod;

        let initStep = Math.max(1, data.attributes.dexterity.step + init.armor_mod + data.discipline_mods.init + data.miscmods.misc_init_step - data.health.damage.wounds);
        init.step = initStep;
        init.dice = StepUtil.getDiceText(initStep);
        init.expr = StepUtil.getDiceExpr(initStep);

        setProperty(this, "data.data.initiative", init);
    }

    // Iterate through items and calculate full step for items what need it
    _prepareItems(data) {
        const items = data.items;
        let totalWeight = 0;
        if (!Array.isArray(items) || !items.length) { return; }

        items.forEach((item) => {
            
            // console.warn("item: ", item);
            let itemWeight = item.data.common.weight;
            totalWeight += itemWeight;
            
            if(item.type == "ability") {
                let comstep = (item.data.attribute == "") ? item.data.rank : item.data.rank + data.data.attributes[item.data.attribute].step;
                item.data.step = comstep;
                item.data.dice = StepUtil.getDiceText(comstep);
                item.data.expr = StepUtil.getDiceExpr(comstep);
            } else if (item.type == "weapon") {
                let comstep = (item.data.attribute == "") ? item.data.base_dmg : item.data.base_dmg + data.data.attributes[item.data.attribute].step;
                item.data.full_dmg.step = comstep;
                item.data.full_dmg.dice = StepUtil.getDiceText(comstep);
                item.data.full_dmg.expr = StepUtil.getDiceExpr(comstep);
            } else if(item.type == "pc_action"){
                let comstep = (item.data.attribute == "") ? item.data.base_step : item.data.base_step + data.data.attributes[item.data.attribute].step;
                let dmgstep = (item.data.dmg_attribute == "") ? item.data.dmg_base : item.data.dmg_base + data.data.attributes[item.data.dmg_attribute].step;
                item.data.step = comstep;
                item.data.dice = StepUtil.getDiceText(comstep);
                item.data.expr = StepUtil.getDiceExpr(comstep);
                item.data.dmg_step = dmgstep;
                item.data.dmg_dice = StepUtil.getDiceText(dmgstep);
                item.data.dmg_expr = StepUtil.getDiceExpr(dmgstep);    
           }

        });

        setProperty(this, "data.data.load", totalWeight);

    }

    _prepareDisciplines(data) {
        console.warn("Data fed to prepare disciplines: ", data);
        if (data.discipline_mods == undefined) {
           let dModsObject = {
                circle_total:0,
                pd:0,
                md:0,
                sd:0,
                pa:0,
                ma:0,
                init:0,
                rc_tests:0,
                rc_step:0,
                karma_die:"1d6"
            }; 

            setProperty(this, "data.data.discipline_mods", dModsObject);
        }

        const discMods = data.data.discipline_mods;
        console.warn("discMods: ", discMods);

        

        let disciplines = this.data.items.filter(function(item) {return item.type == "discipline"});

        if(!Array.isArray(disciplines) || !disciplines.length) { return };
        
        // Initiative 
        discMods.init = Math.max(discMods.pd, this._getDisciplineInitiativeBonus(disciplines));

        // Defenses
        discMods.pd = Math.max(discMods.pd, this._getDisciplineDefenseMods(disciplines)[0]);
        discMods.md = Math.max(discMods.md, this._getDisciplineDefenseMods(disciplines)[1]);
        discMods.sd = Math.max(discMods.sd, this._getDisciplineDefenseMods(disciplines)[2]);

        // Armor
        discMods.pa = Math.max(discMods.pa, this._getDisciplineArmorBonus(disciplines)[0]);
        discMods.ma = Math.max(discMods.ma, this._getDisciplineArmorBonus(disciplines)[1]);

        // Recovery
        discMods.rc_tests = Math.max(discMods.rc_tests, this._getDisciplineRecovery(disciplines)[0]);
        discMods.rc_step = Math.max(discMods.rc_step, this._getDisciplineRecovery(disciplines)[1]);

        // Circle Total
        discMods.circle_total = this._getCombinedCircle(disciplines);

        
    }

    attributeRoll(attr) {
        const actorData = duplicate(this.data);
        let template = "systems/ed4e/templates/roll/rolldialog.hbs";
        let npcMod = actorData.data.npc ? actorData.data.circle : 0; 
        let diceText = StepUtil.getDiceText(actorData.data.attributes[attr].step-actorData.data.health.damage.wounds + npcMod);
        let diceExpr = StepUtil.getDiceExpr(actorData.data.attributes[attr].step-actorData.data.health.damage.wounds + npcMod);
        let showKarma = true;
        let dialogTitle = "Attribute Roll";


        let dialogData = {
            isItem: false,
            dlgTitle: dialogTitle,
            name: attr,
            step: actorData.data.attributes[attr].step - actorData.data.health.damage.wounds + npcMod,
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
        let npcMod = actorData.data.npc ? actorData.data.circle : 0;

        // Get item dice info
        if(item.type == "weapon") {
            diceText = item.data.data.full_dmg.dice;
            diceExpr = item.data.data.full_dmg.expr;
            diceStep = item.data.data.full_dmg.step;
            dialogTitle = "Damage Roll";
        } else if(item.type == "pc_action") {
            diceText = item.data.data.dice;
            diceExpr = item.data.data.expr;
            diceStep = item.data.data.step;
            dialogTitle = "Custom Action";
            showKarma = true;
        } else if(item.type == "npc_attack") {
            diceText = item.data.data.dice;
            diceExpr = item.data.data.expr;
            diceStep = item.data.data.step;
            dialogTitle = "NPC Attack Roll";
            showKarma = false;
        } else {
            diceText = item.data.data.dice;
            diceExpr = item.data.data.expr;
            diceStep = item.data.data.step;
            dialogTitle = item.data.data.subtype + " Roll";
            if (item.type == "ability") {
                showKarma = (item.data.data.subtype=="skill") ? false : true;
            } 
        }

       
        let dialogData = {
            isItem: true,
            dlgTitle: dialogTitle,
            name: item.name,
            step: diceStep - actorData.data.health.damage.wounds,
            dice: StepUtil.getDiceText(diceStep - actorData.data.health.damage.wounds + npcMod),
            expr: StepUtil.getDiceExpr(diceStep - actorData.data.health.damage.wounds + npcMod),
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
                            let adjustedExpr = dialogData.expr;
                            let adjustedDice = dialogData.dice;
                            let adjustedStep = dialogData.step;
                            let miscMod = "+" + html.find("#rollmod").val();
                            let stepMod = Number(html.find("#stepmod").val());
                            let karmaSpend = Number(html.find("#karmaspend").val());

                            if (karmaSpend == undefined) { karmaSpend = 0}; 
                            
                            let myKarmaDie = dialogData.actorData.data.karma.die;
                            if (myKarmaDie == undefined) { myKarmaDie = "d6" }
                            
                        
                            
                            if(dialogData.karma && karmaSpend != 0) {
                                let karmaDieType = myKarmaDie.substring(myKarmaDie.indexOf("d")+1);
                                karmaDie = "+" + karmaSpend + myKarmaDie + "x" + karmaDieType;
                                karmaDieText = "+" + karmaSpend + myKarmaDie;
                            }

                            if(stepMod != 0) {
                                adjustedStep = Math.max(1, adjustedStep + stepMod);
                                adjustedDice = StepUtil.getDiceText(adjustedStep);
                                adjustedExpr = StepUtil.getDiceExpr(adjustedStep);
                            }

                            let karmaNote = (karmaSpend != 0) ? " (Karma Spent: " + karmaSpend + ")" : "";
                            
                            let finalExpr = adjustedExpr + karmaDie + miscMod;
                            let finalDiceText = adjustedDice + karmaDieText + ((miscMod != "+0") ? miscMod : "") + karmaNote;
                            let msgTemplate = "systems/ed4e/templates/chat/rollmessage.hbs";
                            let roll = new Roll(finalExpr).evaluate();
                            let result = roll.total;

                            let msgData = {
                                roll:roll,
                                result:result,
                                name: dialogData.name,
                                mods: miscMod,
                                karmadie: karmaDie,
                                dice: finalDiceText,
                                step: adjustedStep + ((this.data.data.health.damage.wounds != 0) ? " (-Wounds)" : "")
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

    increaseOrDecreaseStat(stat, direction) {

        console.warn("actor method: ", stat, direction);

        const actorData = duplicate(this.data);
        let currDmg = 0;
        let currWounds = 0;
        let currBlood = 0;
        let currKarma = 0;
        let currReco = 0;
        let currMiscInit = 0;

        if (stat == "damage") {

            if (direction == "up") {
                currDmg = actorData.data.health.damage.value;
                currDmg = Math.min(currDmg + 1, actorData.data.health.thresholds.death);
            } else {
                currDmg = actorData.data.health.damage.value;
                currDmg = Math.max(currDmg - 1, 0);
            }
            actorData.data.health.damage.value = currDmg;

            console.warn("currDmg: ", currDmg);

            this.update(actorData);

            // setProperty(this, "data.data.health.damage.value", currDmg);

        } else if (stat == "wounds") {

            if (direction == "up") {
                currWounds = actorData.data.health.damage.wounds;
                currWounds += 1;
            } else {
                currWounds = actorData.data.health.damage.wounds;
                currWounds = Math.max(currWounds - 1, 0);
            }

            actorData.data.health.damage.wounds = currWounds;
            this.update(actorData);

        } else if (stat == "blood") {

            if (direction == "up") {
                currBlood = actorData.data.health.damage.blood;
                currBlood = Math.min(currBlood + 1, actorData.data.health.thresholds.death);
            } else {
                currBlood = actorData.data.health.damage.blood;
                currBlood = Math.max(currBlood - 1, 0);
            }
            
            actorData.data.health.damage.blood = currBlood;
            this.update(actorData);

        } else if (stat == "karma") {

            if (direction == "up") {
                currKarma = actorData.data.karma.value;
                currKarma = Math.min(currKarma + 1, actorData.data.karma.max);
            } else {
                currKarma = actorData.data.karma.value;
                currKarma = Math.max(currKarma - 1, 0);
            }
            
            actorData.data.karma.value = currKarma;
            this.update(actorData);

        } else if (stat == "recov") {
                currReco = actorData.data.health.recovery.avail;
            if (direction == "up") {
                currReco = Math.min(currReco + 1, actorData.data.health.recovery.max);
            } else {
                currReco = Math.max(currReco - 1, 0);
            }
            
            actorData.data.health.recovery.avail = currReco;
            this.update(actorData);

        } else if (stat == "initmod") {

            currMiscInit = actorData.data.miscmods.misc_init_step;

            if (direction == "up") {
                currMiscInit += 1;
            } else {
                currMiscInit -= 1;
            }
            
            actorData.data.miscmods.misc_init_step = currMiscInit;
            this.update(actorData);

        }
        

     
    }

    _getCombinedCircle(disciplines) {
        if(!Array.isArray(disciplines || !disciplines.length)) { return 0;}

        let combinedCircle = 0;
        
        disciplines.forEach(d => combinedCircle += d.data.circle);

        return combinedCircle;
    }

    _getDisciplineDurability(disciplines){

        if(!Array.isArray(disciplines || !disciplines.length)) { return 0;}

        let durabs = [];
        
        disciplines.forEach(d => durabs.push(d.data.durability));

        let maxDur = durabs.reduce((a,b) => { return Math.max(a,b)}, 0);

        return maxDur;

    }

    _getDisciplineDefenseMods(disciplines) {
        console.warn("Discipline List: ", disciplines);
        let pdMods = [];
        let mdMods = [];
        let sdMods = [];
        let discDefMods = [];

        if(!Array.isArray(disciplines) || !disciplines.length) { return [0,0,0]; }
            
        disciplines.forEach((d) => {
            let dc = String(d.data.circle);
            
            pdMods.push(d.data.bonuses[dc].pd);
            mdMods.push(d.data.bonuses[dc].md);
            sdMods.push(d.data.bonuses[dc].sd);

        });
        
        let maxPd = pdMods.reduce(function(a, b) {
            return Math.max(a, b);
        }, 0);

        let maxMd = mdMods.reduce(function(a,b) {
            return Math.max(a, b);
        }, 0);

        let maxSd = sdMods.reduce(function(a,b) {
            return Math.max(a,b);
        }, 0);

        discDefMods.push(maxPd, maxMd, maxSd);

        return discDefMods;
        
    }

    _getDisciplineRecovery(disciplines) {
        if(!Array.isArray(disciplines) || !disciplines.length) { return [0,0]; }

        let rcCounts = [];
        let rcBonuses = [];
        let rcInfo = [];

        disciplines.forEach(d => {
            let dc = String(d.data.circle);
            rcCounts.push(d.data.bonuses[dc].rc_tests);
            rcBonuses.push(d.data.bonuses[dc].rc_step);
        });

        rcInfo.push(
            rcCounts.reduce((a,b) => { return Math.max(a,b); }, 0), 
            rcBonuses.reduce((a,b) => { return Math.max(a,b); }, 0)
        );

        return rcInfo;
    }

    _getDisciplineArmorBonus(disciplines) {
        if(!Array.isArray(disciplines) || !disciplines.length) { return [0,0]; }

        let maMods = [];
        let paMods = [];
        let discArmor = [];

        disciplines.forEach(d => {
            let dc = String(d.data.circle);
            maMods.push(d.data.bonuses[dc].ma);
            paMods.push(d.data.bonuses[dc].pa);
        });

        discArmor.push(
            paMods.reduce((a,b) => { return Math.max(a,b); }, 0), 
            maMods.reduce((a,b) => { return Math.max(a,b); }, 0)
        );

        return discArmor;
    }

    _getDisciplineInitiativeBonus(disciplines){

            if(!Array.isArray(disciplines || !disciplines.length)) { return 0;}
    
            let initMods = [];
            
            disciplines.forEach(d => 
                {
                    let dc = String(d.data.circle);
                    initMods.push(d.data.bonuses[dc].init);
                });

    
            let maxInit = initMods.reduce((a,b) => { return Math.max(a,b);}, 0);
    
            return maxInit;
    
    }
}