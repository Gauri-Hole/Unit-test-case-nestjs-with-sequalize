import { Test, TestingModule } from '@nestjs/testing';
import { CatAdminController } from './cat-admin.controller';
import { CatAdminService } from './cat-admin.service';

const testCatAdmin = { id: 1, name: 'Test cat admin', age: 2, breed: 'Russian Blue', info: 'test info' };

describe('CatAdminController', () => {
  let controller: CatAdminController;
  let service: CatAdminService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatAdminController],
      providers: [{
        provide: CatAdminService,
        useValue: {
          getCatAdmins: jest.fn(() => [testCatAdmin]),
          getCatAdmin: jest.fn().mockImplementation((id: string) =>
            Promise.resolve({
              name: 'Test cat admin',
              age: 2,
              breed: 'Russian Blue',
              info: 'test info',
              id,
            }),
          ),
          addCatAdmin: jest.fn(() => testCatAdmin),
          removeCatAdmin: jest.fn(),
        },
      },
      ],
    }).compile();

    controller = module.get<CatAdminController>(CatAdminController);
    service = module.get<CatAdminService>(CatAdminService);
  });

  it('should get the cats admin', async () => {
    expect(await controller.getCatAdmins()).toEqual([testCatAdmin]);
  });

  it('should make a new cat admin', async () => {
    expect(
      await controller.newCatAdmin({
        name: 'Test cat admin',
        age: 2,
        breed: 'Russian Blue',
        info: 'test info'
      }),
    ).toEqual(testCatAdmin);
  });

  it('should find a cat', async () => {
    await controller.findOne('a id');
    expect(service.getCatAdmin).toHaveBeenCalled();
    expect(controller.findOne('a id')).resolves.toEqual({
      name: 'Test cat admin',
      age: 2,
      breed: 'Russian Blue',
      info: 'test info',
      id: 'a id',
    });
  });

  it('should remove the cat', async () => {
    await controller.remove('anyid');
    expect(service.removeCatAdmin).toHaveBeenCalled();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
