export const ED4E = {

        steps : {
            s1: "1d4-2",
            s2: "1d4-1",
            s3: "1d4",
            s4: "1d6",
            s5: "1d8",
            s6: "1d10",
            s7: "1d12",
            s8: "2d6",
            s9: "1d8+1d6",
            s10: "2d8",
            s11: "1d10+1d8",
            s12: "2d10",
            s13: "1d12+1d10",
            s14: "2d12",
            s15: "1d12+2d6",
            s16: "1d12+1d8+1d6",
            s17: "1d12+2d8",
            s18: "1d12+1d10+1d8",
            s19: "1d20+2d6",
            s20: "1d20+1d8+1d6"
        },
        ability_types: {
            talent: "ED4E.jargon.talent",
            skill: "ED4E.jargon.skill",
        },
        jargon: {
            race: "ED4E.jargon.race",
            discipline: "ED4E.jargon.discipline",
            circle: "ED4E.jargon.circle",
            talent: "ED4E.jargon.talent",
            skill: "ED4E.jargon.skill",
            attribute: "ED4E.jargon.attribute",
            initiative: "ED4E.jargon.initiative",
            damage: "ED4E.jargon.damage",
            wound: "ED4E.jargon.wound",
            death: "ED4E.jargon.death",
            threshold: "ED4E.jargon.threshold",
            karma: "ED4E.jargon.karma",
            step: "ED4E.jargon.step",
            recov_test: "ED4E.jargon.recov_test",
            dice: "ED4E.jargon.dice",
            value: "ED4E.jargon.value",
            action: "ED4E.jargon.action",
            strain: "ED4E.jargon.straing",
            thread: "ED4E.jargon.thread",
            threads: "ED4E.jargon.threads",
            weaving: "ED4E.jargon.weaving",
            artisan: "ED4E.jargon.artisan",
            pattern: "ED4E.jargon.pattern",
            pattern_item: "ED4E.jargon.pattern_item",
            minor_pattern_item: "ED4E.jargon.minor_pattern_item",
            major_pattern_item: "ED4E.jargon.major_pattern_item",
            minor_pattern: "ED4E.jargon.minor_pattern",
            major_pattern: "ED4E.jargon.major_pattern",
            true_pattern: "ED4E.jargon.true_pattern",
            horror: "ED4E.jargon.horror",
            creature: "ED4E.jargon.creature",
            passion: "ED4E.jargon.passion",
            questor: "ED4E.jargon.questor",
            spirit: "ED4E.jargon.spirit",
            elemental: "ED4E.jargon.elemental"
        },
        race: {
            dwarf: "ED4E.race.dwarf",
            elf: "ED4E.race.elf",
            human: "ED4E.race.human",
            obsidiman: "ED4E.race.obsidiman",
            ork: "ED4E.race.ork",
            troll: "ED4E.race.troll",
            tskrang: "ED4E.race.tskrang",
            windling: "ED4E.race.windling"
        },
        vitals: {
            character_name: "ED4E.vitals.character_name",
            race: "ED4E.vitals.character_race",
            sex: "ED4E.vitals.character_sex",
            age: "ED4E.vitals.character_age",
            hair: "ED4E.vitals.character_hair",
            eyes: "ED4E.vitals.character_eyes",
            skin: "ED4E.vitals.character_skin"
        },
        attributes: {
            dexterity: "ED4E.attributes.dexterity",
            strength: "ED4E.attributes.strength",
            toughness: "ED4E.attributes.toughness",
            perception: "ED4E.attributes.perception",
            willpower: "ED4E.attributes.willpower",
            charisma: "ED4E.attributes.charisma"
        },
        defenses: {
            physical: "ED4E.defenses.physical",
            mystic: "ED4E.defenses.mystic",
            social: "ED4E.defenses.social",
        },
        armor: {
            physical: "ED4E.armor.physical",
            mystical: "ED4E.armor.mystic"
        },
        health: {
            current_damage: "ED4E.health.current_damage",
            blood_magic: "ED4E.health.blood_magic",
            uncon: "ED4E.threshold.uncon",
            death: "ED4E.threshold.death",
            wound: "ED4E.threshold.wound",
            recov_avail: "ED4E.recovery.tests_available",
            recov_step: "ED4E.recovery.test_step",
            wounds: "ED4E.health.wounds",
        },
        initiative: {
            init_base: "ED4E.initiative.base_dex",
            init_armor_mod: "ED4E.initiative.armor_mod",
            init_step: "ED4E.initiative.step"
        },
        karma: {
            karma_avail: "ED4E.karma.avail",
            karma_mod: "ED4E.karma.modifier",
            karma_max: "ED4E.karma.max"
        },
        legend: {
            legend_current: "ED4E.legend.current",
            legend_total: "ED4E.legend.total",
        },
        misc: {
            movement: "ED4E.misc.ovement_rate",
            carry: "ED4E.misc.carry_cap"
        },
        discipline: {
            none: "None",
            air_sailor: "ED4E.discipline.air_sailor",
            archer: "ED4E.discipline.archer",
            beastmaster: "ED4E.discipline.beastmaster",
            cavalryman: "ED4E.discipline.cavalryman",
            elementalist: "ED4E.discipline.elementalist",
            gauntlet:"ED4E.discipline.gauntlet",
            illusionist: "ED4E.discipline.illusionist",
            nethermancer: "ED4E.discipline.nethermancer",
            scout: "ED4E.discipline.scout",
            shaman: "ED4E.discipline.shaman",
            sky_raider: "ED4E.discipline.sky_raider",
            swordmaster: "ED4E.discipline.swordmaster",
            thief: "ED4E.discipline.thief",
            troubadour: "ED4E.discipline.troubadour",
            warrior: "ED4E.discipline.warrior",
            weaponsmith: "ED4E.discipline.weaponsmith",
            wizard: "ED4E.discipline.wizard"
        },
        actions: {
            movement: "ED4E.actions.movement",
            standard: "ED4E.actions.standard",
            sustained: "ED4E.actions.sustained",
            simple: "ED4E.actions.simple",
            free: "ED4E.actions.free"
        },
        dialog: {
            actionRoll: "systems/ed4e/templates/roll/actionroll.hbs"
        }
}