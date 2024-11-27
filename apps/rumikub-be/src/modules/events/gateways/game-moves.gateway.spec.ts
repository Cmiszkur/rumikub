import { Test, TestingModule } from '@nestjs/testing';
import { GameMovesGateway } from './game-moves.gateway';

describe('GameMovesGateway', () => {
  let gateway: GameMovesGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameMovesGateway],
    }).compile();

    gateway = module.get<GameMovesGateway>(GameMovesGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
