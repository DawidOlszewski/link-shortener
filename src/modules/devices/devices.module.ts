import { Module } from '@nestjs/common';
import { DevicesRespository } from './devices.repository';
import { DevicesService } from './devices.service';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { Device } from './device.model';

@Module({
  imports: [ObjectionModule.forFeature([Device])],
  providers: [DevicesRespository, DevicesService],
  exports: [DevicesService],
})
export class DevicesModule {}
