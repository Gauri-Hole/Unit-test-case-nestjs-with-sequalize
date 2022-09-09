import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { catAdmin } from './cat-admin.model';
import { CatAdminService } from './cat-admin.service';

const testCatAdmin = { id: 1, name: 'Test cat admin', age: 2, breed: 'Russian Blue', info: 'test info' };

describe('CatAdminService', () => {
  let service: CatAdminService;
  let model: typeof catAdmin;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatAdminService,
        {
          provide: getModelToken(catAdmin),
          useValue: {
            findAll: jest.fn(() => [testCatAdmin]),
            findOne: jest.fn(),
            create: jest.fn(() => testCatAdmin),
            remove: jest.fn(),
          },
        }
      ],
    }).compile();

    service = module.get<CatAdminService>(CatAdminService);
    model = module.get<typeof catAdmin>(getModelToken(catAdmin));
  });

  it('should get the cats admin', async () => {
    expect(await service.getCatAdmins()).toEqual([testCatAdmin]);
  });

  it('should add a cat admin', async () => {
    expect(
      await service.addCatAdmin({ name: 'Test cat admin', age: 2, breed: 'Russian Blue', info: 'test info' }),
    ).toEqual(testCatAdmin);
  });

  it('should get a single cat admin', () => {
    const findSpy = jest.spyOn(model, 'findOne');
    expect(service.getCatAdmin('id'));
    expect(findSpy).toBeCalledWith({ where: { id: 'id' } });
  });

  it('should remove a cat admin', async () => {
    const destroyStub = jest.fn();
    const findSpy = jest.spyOn(model, 'findOne').mockReturnValue({
      destroy: destroyStub,
    } as any);
    const retVal = await service.removeCatAdmin('id');
    expect(findSpy).toBeCalledWith({ where: { id: 'id' } });
    expect(destroyStub).toBeCalledTimes(1);
    expect(retVal).toBeUndefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
});
