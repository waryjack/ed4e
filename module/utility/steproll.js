import { StepUtil } from "./steps.js";
import { Messenger } from "./messenger.js";

export class StepRoll {

    static prompt(step, rolltype, wounds) {

        if (wounds == undefined) {
            wounds = 0;
        }

        console.warn("StepRoll received step: ", step);
        let template = "systems/ed4e/templates/roll/steproll.hbs";
        let showKarma = true;

        let dialogData = {
            dlgTitle: "Roll",
            name: rolltype,
            stepData: StepUtil.getStepTable(),
            karma: showKarma,
            selectStep:step,
            wounds: wounds
        }

        console.warn("stepdata: ", dialogData);

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
                            let finalExpr = "";
                            let finalDiceText = "";
                            
                            let pickedStep = Number(html.find("#pickStep").val());
                            let useKarma = false;
                            let stepmod = Number(html.find("#stepmod").val());
                            let miscmod = "+" + html.find("#rollmod").val();
                            let rollnote = html.find("#rollnote").val();

                            pickedStep += stepmod - dialogData.wounds;
                            
                            let pickedDice = StepUtil.getDiceText(pickedStep);
                            let pickedExpr = StepUtil.getDiceExpr(pickedStep);

                            if(useKarma) {
                                karmaDie = "+1d6x6";
                                karmaDieText = "+1d6 (Karma)";
                            }

                            finalExpr = pickedExpr + karmaDie + miscmod;
                            finalDiceText = pickedDice + karmaDieText + ((miscmod != "+0") ? miscmod + " (misc)" : "");
                            let msgTemplate = "systems/ed4e/templates/chat/rollmessage.hbs";
                            let roll = new Roll(finalExpr).evaluate();
                            let result = roll.total;

                            console.warn("dialogdata", dialogData);

                            let msgData = {
                                roll:roll,
                                result:result,
                                name: dialogData.name,
                                mods: miscmod,
                                karmadie: karmaDie,
                                dice: finalDiceText,
                                step: pickedStep +  ((wounds != 0) ? " (<i>wounds</i>)" : ""),
                                note: rollnote
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

            }).render(true);
        });

    }

}