import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { TileService } from '../services/tile.service';
import { JwtAuthGuard } from '../../../guards/guest-jwt.guard';
import { ExtendedRequest } from '@rumikub/shared-models';
import { GetPlayerTilesDto } from '../get-player-tiles.dto';

@Controller('tile')
export class TileController {
  constructor(private readonly tileService: TileService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':gameId/:playerId')
  async getTiles(
    @Param() params: GetPlayerTilesDto,
    @Req() req: ExtendedRequest
  ) {
    const { gameId, playerId } = params;
    return this.tileService.getTiles(gameId, playerId, req.user?.username)
  }
}
