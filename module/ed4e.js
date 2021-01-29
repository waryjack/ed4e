// Imports

import { ED4E } from "./config.js";
import ED4EActorSheet from "./sheets/actor/ED4EActorSheet.js";
import ED4EItemSheet from "./sheets/item/ED4EItemSheet.js";
import { ED4EActor } from "./actor/ED4EActor.js";
import { preloadHandlebarsTemplates } from "./templates.js";
import { StepUtil } from "./utility/steps.js";
import { StepRoll } from "./utility/steproll.js";
import * as macros from "./macros.js";


Hooks.once("init", () => {
    console.log("ewhen | Initializing Earthdawn 4E System");

    CONFIG.ed4e = ED4E;
   
    // Add namespace in global 
    
    game.ED4E = {
       ED4EActorSheet,
       ED4EItemSheet,
       ED4EActor,
       macros: macros
    };

    // CONFIG.debug.hooks = true;
    CONFIG.Actor.entityClass = ED4EActor;
    // CONFIG.Item.entityClass = ED4EItem; 
    
    // Unregister core sheets
    Actors.unregisterSheet("core", ActorSheet);
    Items.unregisterSheet("core", ItemSheet);

    // Register System sheets
    Actors.registerSheet("ed4e", ED4EActorSheet, { types:["character", "creature", "spirit"], makeDefault:true });
    Actors.registerSheet("ed4e", ED4EActorSheet, { types:["npc"]});
    Items.registerSheet("ed4e", ED4EItemSheet, {makeDefalt:true});



    // Register system settings
    //  registerSettings();
    
    // Register partials templates
    preloadHandlebarsTemplates();

    // Register handlebar helpers
    Handlebars.registerHelper('ife', function(arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

    Handlebars.registerHelper("times", function(n, content) {
       let result = "";
       if (n==0 || n == null) return;
       for (let i = 0; i < n; i++) {
           result += content.fn(i)
       }
       
       return result;

    });

    //uppercases; needs work
    Handlebars.registerHelper("proper", function(content) {
        let result = "";

        result = content[0].toUpperCase() + content.substring(1);

        return result;

    });

    Handlebars.registerHelper("minus", function(arg1, arg2) {
        let result = arg1 - arg2;

        return result;
    });

    Handlebars.registerHelper("render", function(arg1){
        
        return new Handlebars.SafeString(arg1);
    });

    // Checks whether a game setting is active
    Handlebars.registerHelper("setting", function(arg){
        return game.settings.get('ewhen', arg); 
    });

    Handlebars.registerHelper('concat', function() {
        var outStr = '';
        for(var arg in arguments){
            if(typeof arguments[arg]!='object'){
                outStr += arguments[arg];
            }
        }
        return outStr;
    });

    Handlebars.registerHelper("and", function(a, b){
        return (a && b); 
    });

    Handlebars.registerHelper("or", function(a, b){
        return (a || b);
    });

    Handlebars.registerHelper("stepnum", function(a){
        return a.substring(a.indexOf("s")+1);
    });

    Handlebars.registerHelper("stringify", function(a){
        
            return String(a);
    });
});

/**
 * Item Hooks - update, delete, make sure to adjust stats 
 * for armor and so forth, initiative.
 * 
 * Todo - consolidate and move to method(s) in EWActor?
 */

/**
 * Hooks for setting the Step value of an item when it's added
 */

Hooks.once("ready", () => {
    // Listen for dice icon click
    const diceIconSelector = '#chat-controls i.fas.fa-dice-d20';
    $(document).on('click', diceIconSelector, () => { 
        StepRoll.prompt(0, "General Step");
    });

    // Catch macro drop
    Hooks.on("hotbarDrop", (bar, data, slot) => macros.createEd4eMacro(data, slot));


});

/* Hooks.on("updateOwnedItem", (actor, item, changed) => {

    let totalStep = 0;
    let effStep = 0;
    if(item.type == "ability") {
        
        totalStep = actor.data.data.attributes[item.data.attribute].step + item.data.rank;
        item.data.step = totalStep;
        item.data.dice = StepUtil.getDiceText(totalStep);
        item.data.expr = StepUtil.getDiceExpr(totalStep);
    }
    if(item.type == "pc_action") {
        totalStep = (item.data.attribute == "") ? item.data.step : item.data.step + actor.data.data.attributes[item.data.attribute].step;
        effStep = (item.data.dmg_attribute == "") ? item.data.dmg_step : item.data.dmg_step + actor.data.data.attributes[item.data.dmg_attribute].step;
        item.data.step = totalStep;
        item.data.dice = StepUtil.getDiceText(totalStep);
        item.data.expr = StepUtil.getDiceExpr(totalStep);

        item.data.dmg_step = effStep;
        item.data.dmg_dice = StepUtil.getDiceText(effStep);
        item.data.dmg_expr = StepUtil.getDiceExpr(effStep);
    }
});

*/

Hooks.on('renderChatMessage', (app, html) => {

    html.on('click', '.taskroll-msg', event => {
        event.preventDefault();
        // NOTE: This depends on the exact card template HTML structure.
        $(event.currentTarget).siblings('.taskroll-tt').slideToggle("fast");
     });
 
     html.on('click', '.taskroll-info', event => {
        event.preventDefault();
        // NOTE: This depends on the exact card template HTML structure.
        $(event.currentTarget).siblings('.taskroll-tt').slideToggle("fast");
     });

});
