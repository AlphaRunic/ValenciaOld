export = class Wave {
    public constructor(
        private amplitude: number = 1,
        private frequency: number = 1,
        private phaseShift: number = 0,
        private verticalShift: number = 0
    ) {}

    public Update(dt: number): number {
        return (this.amplitude * math.sin(this.frequency * tick() + this.phaseShift) + this.verticalShift) * 60 * dt;
    }
}