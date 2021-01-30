# Earthdawn 4E Unofficial System

This Foundry system is designed to streamline some of the basic elements of playing *Earthdawn 4th Edition* by FASA Games. The system provides interactive character sheets with some calculation of derived stats, such as defenses, death/unconsciousness/wound thresholds, and initiative.

Additionally, the system supports the creation of both Adept and mundane full characters, as well as the streamlined NPCs discussed in the *Earthdawn* core books. The two character types are different (NPCs have a streamlined set of *abilities* instead of the full array of talents, skills, knacks, and so forth. 

## Purpose
The system provides interactive character sheets for characters and NPCs, as well as a dice roller using Earthdawn's unique "Step" system (with steps up to 50 built in). It provides for convenient tracking of character stats, creation of abilities, talents, skills, equipment (including spell matrices, armor, and so forth), and tracking of wealth and legend points.

The system does **not automate playing Earthdawn 4E.** There is no built in targeting and combat resolution, automation of items, or active effects. Additionally, it contains no compendiums or pre-built sets of spells, creatures, characters, items, or other content. Users of this system will need to create all characters, items, creatures, and other game content themselves. 

## Notes and Recommendations
* This ED4E Foundry System *is* compatible with Dice So Nice!
* This system does not include initiative rerolling per-round at this point (that's on the to-do list, but not done). I recommend using the **Combat Utility Belt** module (https://foundryvtt.com/packages/combat-utility-belt/) to accommodate initiative rerolling. 

## Instructions
### Using The Character Sheet
* Player editable fields are surrounded by a box (they are input fields). Any field that is not an input box is auto-calculated.
* Select your character's race and discipline, and enter the character's current circle.
* Enter your character's attribute values at the top of the sheet (note: steps and most basic stats will automatically calculate based on these attributes).
* Navigate different sections of the sheet by clicking on the headings in the bar below the basic defense, health, and initiative info.
* Click the "+" sign to add an item to one of the lists. When adding items, do not add your attribute step to the rank or basic damage - it will be automatically handled.
* Click the edit icon at the right of an item to edit it, or the trash can icon to delete it.
* For armor, click the "Equip" checkbox to equip it. You can have one armor and one shield equipped at a time.
* Miscellaneous modifiers can be added in the "Misc" section - if it's a bonus, just enter the number. If it's a penalty, use a minus sign before the number.</li>

### Rolling Dice
* Clicking the button containing the name of an attribute will roll the dice for that attribute, with the option to add a step modifier, a result modifier, and spend karma.
* Clicking the button for the **Step** of an ability, talent or skill will roll the appropriate step. Clicking the button for the **Effect** will roll the corresponding step to determine damage or other effects of an ability.
* Clicking the d20 icon at the bottom of the chat window will call up a generic roll dialog, where you can pick the appropriate step to roll.
* Karma, damage, wounds, and recovery tests are not tracked - you will need to manually edit those fields at this time. <strong>However,</strong> wound penalties <em>are</em> automatically applied to rolls.

## To-Do
* Talent Knacks: talent knacks can be added as regular talents now, but future work will allow users to associate them (at least for reference purposes on the character sheet) with the related talent. 
* Code cleanup: cleaning up redundant or unused code is a priority following playtesting and finalizing the sheet layouts.
* Thread item effects: the ability for thread items to automatically apply their bonuses is under consideration.
* Random NPC Generator: another possibility - letting GMs randomize the stats of basic NPCs quickly. This is much longer-term. 
* Dice So Nice compatibility
* Initiative rerolling without needing outside modules
