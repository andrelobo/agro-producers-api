import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate a user', async () => {
    const user = { id: 34, username: 'testuser', password: 'testpass' };
    jest.spyOn(usersService, 'findOne').mockResolvedValue(user);

    const result = await service.validateUser('testuser', 'testpass');
    expect(result).toEqual({ id: 34, username: 'testuser' });
  });

  it('should not validate an invalid user', async () => {
    jest.spyOn(usersService, 'findOne').mockResolvedValue(null);

    const result = await service.validateUser('invaliduser', 'testpass');
    expect(result).toBeNull();
  });

  it('should generate a JWT token', async () => {
    const user = { username: 'testuser', userId: 1 };
    jest.spyOn(jwtService, 'sign').mockReturnValue('signed-jwt-token');

    const result = await service.login(user);
    expect(result).toEqual({ access_token: 'signed-jwt-token' });
  });
});
