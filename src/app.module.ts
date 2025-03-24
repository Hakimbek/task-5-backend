import { Module } from '@nestjs/common';
import { BookModule } from "./book/book.module";
import { HealthController } from "./health/health.controller";

@Module({
  imports: [BookModule],
  controllers: [HealthController],
})
export class AppModule {}
