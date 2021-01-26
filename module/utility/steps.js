export class StepUtil {

    static steps = [
        {dice:"1d4-3", expr:"1d4x4-3"},
        {dice:"1d4-2", expr:"1d4x4-2"},
        {dice:"1d4-1", expr:"1d4x4-2"},
        {dice:"1d4", expr:"1d4x4"},
        {dice:"1d6", expr:"1d6x6"},
        {dice:"1d8", expr:"1d8x8"},
        {dice:"1d10", expr:"1d10x10"},
        {dice:"1d12", expr:"1d12x12"},
        {dice:"2d6", expr:"2d6x6"},
        {dice:"1d8+1d6", expr:"1d8x8+1d6x6"},
        {dice:"2d8", expr:"2d8x8"},
        {dice:"1d10+1d8", expr:"1d10x10+1d8x8"},
        {dice:"2d10", expr:"2d10x10"},
        {dice:"1d12+1d10", expr:"1d12x12+1d10x10"},
        {dice:"2d12", expr:"2d12x12"},
        {dice:"1d12+2d6", expr:"1d12x12+2d6x6"},
        {dice:"1d12+1d8+1d6", expr:"1d12x12+1d8x8+1d6x6"},
        {dice:"1d12+2d8", expr:"1d12x12+2d8x8"},
        {dice:"1d12+1d10+1d8", expr:"1d12x12+1d10x10+1d8x8"},
        {dice:"1d10+2d6", expr:"1d20x20+2d6x6"},
        {dice:"1d20+1d8+1d6", expr:"1d20x20+1d8x8+1d6x6"},
        {dice:"1d20+2d8", expr:"1d20x20+2d8x8"},
        {dice:"1d20+1d10+1d8", expr:"1d20x20+1d10x10+1d8x8"},
        {dice:"1d20+2d10", expr:"1d20x20+2d10x10"},
        {dice:"1d20+1d12+1d10", expr:"1d20x20+1d12x12+1d10x10"},
        {dice:"1d20+2d12", expr:"1d20x20+2d12x12"},
        {dice:"1d20+1d12+2d6", expr:"1d20x20+1d12x12+2d6x6"},
        {dice:"1d20+1d12+1d8+1d6", expr:"1d20x20+1d12x12+1d8x8+1d6x6"},
        {dice:"1d20+1d12+2d8", expr:"1d20x20+1d12x12+2d8x8"},
        {dice:"1d20+1d12+1d10+1d8", expr:"1d20x20+1d12x12+1d10x10+1d8x8"},
        {dice:"2d20+2d6", expr:"2d20x20+2d6x6"},
        {dice:"2d20+1d8+1d6", expr:"2d20x20+1d8x8+1d6x6"},
		{dice:"2d20+2d8", expr:"2d20x20+2d8x8"},
		{dice:"2d20+1d10+1d8", expr:"2d20x20+1d10x10+1d8x8"},
		{dice:"2d20+2d10", expr:"2d20x20+2d10x10"},
		{dice:"2d20+1d12+1d10",expr:"2d20x20+1d12x12+1d10x10"},
		{dice:"2d20+2d12", expr:"2d20x20+2d12x12"},
		{dice:"2d20+1d12+2d6", expr:"2d20x20+1d12x12+2d6x6"},
		{dice:"2d20+1d12+1d8+1d6", expr:"2d20x20+1d12x12+1d8x8+1d6x6"},
		{dice:"2d20+1d12+2d8", expr:"2d20x20+1d12x12+2d8x8"},
        {dice:"2d20+1d12+1d10+1d8", expr:"2d20x20+1d12x12+1d10x10+1d8x8"},
        {dice:"3d20+2d6", expr:"3d20x20+2d6x6"},
		{dice:"3d20+1d8+1d6", expr:"3d20x20+1d8x8+1d6x6"},
		{dice:"3d20+2d8", expr:"3d20x20+2d8x8"},
		{dice:"3d20+1d10+1d8", expr:"3d20x20+1d10x10+1d8x8"},
		{dice:"3d20+2d10", expr:"3d20x20+2d10x10"},
		{dice:"3d20+1d12+1d10", expr:"3d20x20+1d12x12+1d10x10"},
		{dice:"3d20+2d12", expr:"3d20x20+2d12x12"},
		{dice:"3d20+1d12+2d6", expr:"3d20x20+1d12x12+2d6x6"},
		{dice:"3d20+1d12+1d8+1d6", expr:"3d20x20+1d12x12+1d8x8+1d6x6"},
		{dice:"3d20+1d12+2d8", expr:"3d20x20+1d12x12+2d8x8"}
    ]   

    static getStepTable() {
        return this.steps;
    }
    
    static getDiceData(step) {
        return this.steps[step];
    }

    static getDiceText(step) {
    
        return this.steps[step].dice;
    }

    static getDiceExpr(step) {
        return this.steps[step].expr;
    }
}