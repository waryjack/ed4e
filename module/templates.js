export const preloadHandlebarsTemplates = async function() {
    return loadTemplates([
  
     // Actor Partials
     "systems/ed4e/templates/actor/partials/attributes.hbs",
     "systems/ed4e/templates/actor/partials/attributes-h.hbs",
     "systems/ed4e/templates/actor/partials/defenses.hbs",
     "systems/ed4e/templates/actor/partials/initiative.hbs",
     "systems/ed4e/templates/actor/partials/health.hbs",
     "systems/ed4e/templates/actor/partials/init-move-karma.hbs",
     "systems/ed4e/templates/actor/partials/wealth.hbs",
     "systems/ed4e/templates/actor/partials/bio.hbs",
     "systems/ed4e/templates/actor/partials/legend.hbs",

     "systems/ed4e/templates/actor/partials/skills.hbs",
     "systems/ed4e/templates/actor/partials/talents.hbs",
     "systems/ed4e/templates/actor/partials/weapons.hbs",
     "systems/ed4e/templates/actor/partials/spells.hbs",
     "systems/ed4e/templates/actor/partials/thread-items.hbs",
     "systems/ed4e/templates/actor/partials/equipment.hbs",
     "systems/ed4e/templates/actor/partials/armor.hbs",
     "systems/ed4e/templates/actor/partials/misc.hbs",

     // Item Partials
     "systems/ed4e/templates/item/partials/attribute_select.hbs",
     "systems/ed4e/templates/item/partials/action_select.hbs",

     "systems/ed4e/templates/actor/partials/discipline_select.hbs",
     "systems/ed4e/templates/actor/partials/race_select.hbs"
    ]);
  };