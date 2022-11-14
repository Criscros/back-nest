import { HealthCheckService } from '@nestjs/terminus';
declare class HealthController {
    private health;
    constructor(health: HealthCheckService);
    check(): Promise<import("@nestjs/terminus").HealthCheckResult>;
}
export default HealthController;
