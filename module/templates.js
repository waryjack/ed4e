export const preloadHandlebarsTemplates = async function() {
    return loadTemplates([
  
     // Actor Partials
     "systems/ed4e/templates/actor/partials/attributes.hbs",
     "systems/ed4e/templates/actor/partials/defenses.hbs",
     "systems/ed4e/templates/actor/partials/initiative.hbs"
    ]);
  };