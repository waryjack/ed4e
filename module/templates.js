export const preloadHandlebarsTemplates = async function() {
    return loadTemplates([
  
     // Actor Partials
     "systems/ed4e/templates/actor/partials/attributes.hbs",
     "systems/ed4e/templates/actor/partials/attributes-h.hbs",
     "systems/ed4e/templates/actor/partials/defenses.hbs",
     "systems/ed4e/templates/actor/partials/initiative.hbs",
     "systems/ed4e/templates/actor/partials/health.hbs",
     "systems/ed4e/templates/actor/partials/health-alt.hbs",
     "systems/ed4e/templates/actor/partials/init-move-karma.hbs",
     "systems/ed4e/templates/actor/partials/wealth.hbs",
     "systems/ed4e/templates/actor/partials/bio.hbs",
     "systems/ed4e/templates/actor/partials/legend.hbs",
     "systems/ed4e/templates/actor/partials/actions.hbs",
     "systems/ed4e/templates/actor/partials/skills.hbs",
     "systems/ed4e/templates/actor/partials/talents.hbs",
     "systems/ed4e/templates/actor/partials/weapons.hbs",
     "systems/ed4e/templates/actor/partials/spells.hbs",
     "systems/ed4e/templates/actor/partials/thread-items.hbs",
     "systems/ed4e/templates/actor/partials/equipment.hbs",
     "systems/ed4e/templates/actor/partials/armor.hbs",
     "systems/ed4e/templates/actor/partials/misc.hbs",
     "systems/ed4e/templates/actor/partials/misc2.hbs",
     "systems/ed4e/templates/actor/partials/portrait.hbs",
     "systems/ed4e/templates/actor/partials/instructions.hbs",
     "systems/ed4e/templates/actor/partials/race_select.hbs",
     "systems/ed4e/templates/actor/partials/steplist.hbs",
     "systems/ed4e/templates/actor/partials/discipline_select.hbs",
     "systems/ed4e/templates/actor/partials/matrix.hbs",
     "systems/ed4e/templates/actor/partials/disciplines.hbs",
     "systems/ed4e/templates/actor/partials/traits.hbs",
     "systems/ed4e/templates/actor/partials/journeys.hbs",

     //Alt charsheet partials
     "systems/ed4e/templates/actor/partials/attributes-sidebar.hbs",
     "systems/ed4e/templates/actor/partials/defenses-sidebar.hbs",

     // Item Partials
     "systems/ed4e/templates/item/partials/attribute_select.hbs",
     "systems/ed4e/templates/item/partials/action_select.hbs",
     "systems/ed4e/templates/item/partials/action_attribute_select.hbs",
     "systems/ed4e/templates/item/partials/action_dmg_attribute_select.hbs",

     
     // NPC Partials
     "systems/ed4e/templates/actor/partials/npc/attributes-npc.hbs",
     "systems/ed4e/templates/actor/partials/npc/defenses-npc.hbs",
     "systems/ed4e/templates/actor/partials/npc/health-npc.hbs",
     "systems/ed4e/templates/actor/partials/npc/abilities-npc.hbs",
     "systems/ed4e/templates/actor/partials/npc/misc-npc.hbs"
    ]);
  };